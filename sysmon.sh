#!/usr/bin/env bash
# sysmon.sh — System Resource Monitor
# Usage: ./sysmon.sh [--json]

# ── ANSI Colors ──────────────────────────────────────────────────────────────
RESET="\e[0m"
BOLD="\e[1m"
CYAN="\e[36m"
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
BLUE="\e[34m"
MAGENTA="\e[35m"
WHITE="\e[97m"
DIM="\e[2m"

# ── Flags ─────────────────────────────────────────────────────────────────────
JSON_MODE=false
for arg in "$@"; do
  case "$arg" in
    --json) JSON_MODE=true ;;
    -h|--help)
      echo "Usage: $0 [--json]"
      echo "  --json   Output in JSON format instead of colored terminal output"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      echo "Usage: $0 [--json]" >&2
      exit 1
      ;;
  esac
done

# ── Data Collection ──────────────────────────────────────────────────────────

# CPU usage: compute from /proc/stat (two samples, 0.5s apart)
get_cpu_usage() {
  local cpu_line cpu_arr idle total cpu_line2 cpu_arr2 idle2 total2
  local diff_idle diff_total val

  read -r cpu_line < /proc/stat
  read -ra cpu_arr <<< "$cpu_line"
  idle=${cpu_arr[4]}
  total=0
  for val in "${cpu_arr[@]:1}"; do total=$((total + val)); done

  sleep 0.5

  read -r cpu_line2 < /proc/stat
  read -ra cpu_arr2 <<< "$cpu_line2"
  idle2=${cpu_arr2[4]}
  total2=0
  for val in "${cpu_arr2[@]:1}"; do total2=$((total2 + val)); done

  local diff_idle=$((idle2 - idle))
  local diff_total=$((total2 - total))

  awk "BEGIN {printf \"%.1f\", ($diff_total - $diff_idle) * 100 / $diff_total}"
}

cpu_used=$(get_cpu_usage)

# Memory usage
mem_info=$(free -m)
mem_total=$(echo "$mem_info" | awk '/^Mem:/ {print $2}')
mem_used=$(echo "$mem_info"  | awk '/^Mem:/ {print $3}')
mem_free=$(echo "$mem_info"  | awk '/^Mem:/ {print $4}')
mem_avail=$(echo "$mem_info" | awk '/^Mem:/ {print $7}')
mem_pct=$(awk "BEGIN {printf \"%.1f\", $mem_used * 100 / $mem_total}")

swap_total=$(echo "$mem_info" | awk '/^Swap:/ {print $2}')
swap_used=$(echo "$mem_info"  | awk '/^Swap:/ {print $3}')
if [ "${swap_total:-0}" -gt 0 ] 2>/dev/null; then
  swap_pct=$(awk "BEGIN {printf \"%.1f\", $swap_used * 100 / $swap_total}")
else
  swap_pct="0.0"
fi

# Disk usage (root filesystem)
read -r disk_total disk_used_h disk_avail disk_pct_raw < <(
  df -h / | awk 'NR==2 {gsub(/%/,""); print $2, $3, $4, $5}'
)
disk_pct="${disk_pct_raw:-0}"

# Top 5 processes by memory
mapfile -t proc_lines < <(
  ps aux --sort=-%mem | awk 'NR>1 {printf "%s|%s|%s|%s\n", $2, $4, $3, $11}' | head -5
)

# ── JSON Output ───────────────────────────────────────────────────────────────
if $JSON_MODE; then
  hostname_val=$(hostname)
  timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  procs_json="["
  first=true
  for line in "${proc_lines[@]}"; do
    IFS='|' read -r pid mem_p cpu_p cmd <<< "$line"
    $first || procs_json+=","
    procs_json+="{\"pid\":${pid},\"mem_pct\":${mem_p},\"cpu_pct\":${cpu_p},\"command\":\"$(basename "$cmd")\"}"
    first=false
  done
  procs_json+="]"

  cat <<EOF
{
  "timestamp": "${timestamp}",
  "hostname": "${hostname_val}",
  "cpu": {
    "used_pct": ${cpu_used}
  },
  "memory": {
    "total_mb": ${mem_total},
    "used_mb": ${mem_used},
    "free_mb": ${mem_free},
    "available_mb": ${mem_avail},
    "used_pct": ${mem_pct},
    "swap_total_mb": ${swap_total},
    "swap_used_mb": ${swap_used},
    "swap_used_pct": ${swap_pct}
  },
  "disk": {
    "mount": "/",
    "total": "${disk_total}",
    "used": "${disk_used_h}",
    "available": "${disk_avail}",
    "used_pct": ${disk_pct}
  },
  "top_processes_by_memory": ${procs_json}
}
EOF
  exit 0
fi

# ── Colored Terminal Output ───────────────────────────────────────────────────

# Color a percentage value (green < 60, yellow < 85, red >= 85)
color_pct() {
  local pct="${1:-0}"
  local int_pct="${pct%.*}"
  int_pct="${int_pct:-0}"
  if   (( int_pct < 60 )); then printf "${GREEN}${pct}%%${RESET}"
  elif (( int_pct < 85 )); then printf "${YELLOW}${pct}%%${RESET}"
  else                          printf "${RED}${pct}%%${RESET}"
  fi
}

# Draw a progress bar (width=30)
bar() {
  local pct="${1:-0}"
  local width=30
  local filled
  filled=$(awk "BEGIN {f=int($pct * $width / 100); if(f>$width) f=$width; print f}")
  local empty=$(( width - filled ))
  local int_pct="${pct%.*}"
  int_pct="${int_pct:-0}"

  local color
  if   (( int_pct < 60 )); then color="$GREEN"
  elif (( int_pct < 85 )); then color="$YELLOW"
  else                          color="$RED"
  fi

  printf "${color}[${RESET}"
  if (( filled > 0 )); then printf "${color}%${filled}s${RESET}" | tr ' ' '█'; fi
  if (( empty  > 0 )); then printf "${DIM}%${empty}s${RESET}"    | tr ' ' '░'; fi
  printf "${color}]${RESET}"
}

# ── Header ────────────────────────────────────────────────────────────────────
HOSTNAME_VAL=$(hostname)
DATESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
SUBTITLE="${DATESTAMP} — ${HOSTNAME_VAL}"
SUBTITLE_LEN=${#SUBTITLE}
INNER_WIDTH=48
PAD_RIGHT=$(( INNER_WIDTH - 2 - SUBTITLE_LEN ))
if (( PAD_RIGHT < 0 )); then PAD_RIGHT=0; fi

echo -e ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════╗${RESET}"
printf  "${BOLD}${CYAN}║${RESET}  ${BOLD}${WHITE}%-46s${RESET}${BOLD}${CYAN}║${RESET}\n" "System Resource Monitor"
printf  "${BOLD}${CYAN}║${RESET}  ${DIM}%s${RESET}" "$SUBTITLE"
printf  "%${PAD_RIGHT}s" ""
printf  "${BOLD}${CYAN}║${RESET}\n"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════╝${RESET}"

# ── CPU ───────────────────────────────────────────────────────────────────────
echo -e ""
echo -e "${BOLD}${BLUE}▶ CPU Usage${RESET}"
printf  "  Used : "
bar "$cpu_used"
printf  " "
color_pct "$cpu_used"
echo ""

# ── Memory ────────────────────────────────────────────────────────────────────
echo -e ""
echo -e "${BOLD}${MAGENTA}▶ Memory Usage${RESET}"
printf  "  RAM  : "
bar "$mem_pct"
printf  " "
color_pct "$mem_pct"
printf  "  (%sM / %sM, avail: %sM)\n" "$mem_used" "$mem_total" "$mem_avail"

if [ "${swap_total:-0}" -gt 0 ] 2>/dev/null; then
  printf "  Swap : "
  bar "$swap_pct"
  printf " "
  color_pct "$swap_pct"
  printf "  (%sM / %sM)\n" "$swap_used" "$swap_total"
else
  printf "  Swap : ${DIM}not configured${RESET}\n"
fi

# ── Disk ──────────────────────────────────────────────────────────────────────
echo -e ""
echo -e "${BOLD}${YELLOW}▶ Disk Usage${RESET}"
printf "  ${BOLD}%-12s %-8s %-8s %-8s %-5s %s${RESET}\n" "Mount" "Total" "Used" "Avail" "Use%" "Bar"
echo -e "  ${DIM}──────────────────────────────────────────────────────${RESET}"

while IFS= read -r line; do
  [[ "$line" =~ ^Filesystem ]] && continue
  read -r src sz us av pc mt < <(echo "$line")
  pc_num="${pc//%/}"
  pc_num="${pc_num:-0}"
  # Truncate long mount paths to keep columns aligned
  mt_short="${mt}"
  if (( ${#mt} > 10 )); then
    mt_short="...${mt: -9}"
  fi
  printf "  %-12s %-8s %-8s %-8s %3s%%  " "$mt_short" "$sz" "$us" "$av" "$pc_num"
  bar "$pc_num"
  echo ""
done < <(df -h --output=source,size,used,avail,pcent,target 2>/dev/null \
         | grep -v tmpfs | grep -v udev | grep -v devtmpfs | grep -v "^Filesystem" \
         | head -5)

# ── Top 5 Processes by Memory ─────────────────────────────────────────────────
echo -e ""
echo -e "${BOLD}${GREEN}▶ Top 5 Processes by Memory${RESET}"
printf  "  ${BOLD}%-7s %-7s %-7s %s${RESET}\n" "PID" "%MEM" "%CPU" "COMMAND"
echo -e "  ${DIM}────────────────────────────────────────${RESET}"

for line in "${proc_lines[@]}"; do
  IFS='|' read -r pid mem_p cpu_p cmd <<< "$line"
  int_mem="${mem_p%.*}"
  int_mem="${int_mem:-0}"
  if   (( int_mem >= 10 )); then mem_color="$RED"
  elif (( int_mem >= 5  )); then mem_color="$YELLOW"
  else                           mem_color="$GREEN"
  fi
  printf "  %-7s ${mem_color}%-7s${RESET} %-7s %s\n" \
    "$pid" "${mem_p}%" "${cpu_p}%" "$(basename "$cmd")"
done

echo -e ""
echo -e "  ${DIM}Run with --json for machine-readable output${RESET}"
echo -e ""
