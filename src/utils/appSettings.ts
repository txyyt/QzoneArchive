const ARCHIVE_INTERVAL_KEY = "qzone-archive-page-interval";
const ARCHIVE_RESUME_CURSOR_MAX_AGE_KEY = "qzone-archive-resume-cursor-max-age";
const ARCHIVE_FEED_RETRY_ATTEMPTS_KEY = "qzone-archive-feed-retry-attempts";
export const MIN_ARCHIVE_INTERVAL = 2000;
export const DEFAULT_ARCHIVE_INTERVAL = 3000;
export const MIN_ARCHIVE_FEED_RETRY_ATTEMPTS = 1;
export const MAX_ARCHIVE_FEED_RETRY_ATTEMPTS = 12;
export const DEFAULT_ARCHIVE_FEED_RETRY_ATTEMPTS = 6;
export const RESUME_CURSOR_AGE_OPTIONS = [
  { label: "10 分钟", value: 10 * 60 },
  { label: "30 分钟", value: 30 * 60 },
  { label: "1 小时（推荐）", value: 60 * 60 },
  { label: "3 小时", value: 3 * 60 * 60 },
  { label: "6 小时", value: 6 * 60 * 60 },
  { label: "12 小时", value: 12 * 60 * 60 },
  { label: "24 小时", value: 24 * 60 * 60 },
] as const;
export const DEFAULT_RESUME_CURSOR_MAX_AGE_SECONDS = 60 * 60;

export function getArchiveInterval() {
  const value = Number(localStorage.getItem(ARCHIVE_INTERVAL_KEY));
  return Number.isFinite(value) ? Math.min(30000, Math.max(MIN_ARCHIVE_INTERVAL, Math.round(value))) : DEFAULT_ARCHIVE_INTERVAL;
}

export function setArchiveInterval(value: number) {
  const normalized = Math.min(30000, Math.max(MIN_ARCHIVE_INTERVAL, Math.round(value || DEFAULT_ARCHIVE_INTERVAL)));
  localStorage.setItem(ARCHIVE_INTERVAL_KEY, String(normalized));
  return normalized;
}

export function getResumeCursorMaxAgeSeconds() {
  const value = Number(localStorage.getItem(ARCHIVE_RESUME_CURSOR_MAX_AGE_KEY));
  return RESUME_CURSOR_AGE_OPTIONS.some((option) => option.value === value)
    ? value
    : DEFAULT_RESUME_CURSOR_MAX_AGE_SECONDS;
}

export function setResumeCursorMaxAgeSeconds(value: number) {
  const normalized = RESUME_CURSOR_AGE_OPTIONS.find((option) => option.value === value)?.value
    ?? DEFAULT_RESUME_CURSOR_MAX_AGE_SECONDS;
  localStorage.setItem(ARCHIVE_RESUME_CURSOR_MAX_AGE_KEY, String(normalized));
  return normalized;
}

export function getArchiveFeedRetryAttempts() {
  const value = Number(localStorage.getItem(ARCHIVE_FEED_RETRY_ATTEMPTS_KEY));
  return Number.isFinite(value)
    ? Math.min(MAX_ARCHIVE_FEED_RETRY_ATTEMPTS, Math.max(MIN_ARCHIVE_FEED_RETRY_ATTEMPTS, Math.round(value)))
    : DEFAULT_ARCHIVE_FEED_RETRY_ATTEMPTS;
}

export function setArchiveFeedRetryAttempts(value: number) {
  const normalized = Math.min(MAX_ARCHIVE_FEED_RETRY_ATTEMPTS, Math.max(MIN_ARCHIVE_FEED_RETRY_ATTEMPTS, Math.round(value || DEFAULT_ARCHIVE_FEED_RETRY_ATTEMPTS)));
  localStorage.setItem(ARCHIVE_FEED_RETRY_ATTEMPTS_KEY, String(normalized));
  return normalized;
}

export function resetAppSettings() {
  localStorage.removeItem(ARCHIVE_INTERVAL_KEY);
  localStorage.removeItem(ARCHIVE_RESUME_CURSOR_MAX_AGE_KEY);
  localStorage.removeItem(ARCHIVE_FEED_RETRY_ATTEMPTS_KEY);
}
