'use client'


/**
 * Static configuration constants
 */
const STATIC_MODE_ENABLED = true
const FEATURE_DISABLED_MESSAGE = 'Access Control is currently disabled'


/**
 * Static implementation - Access Control component (disabled)
 * Returns a simple disabled message instead of complex permission management UI
 */
export function AccessControl() {
  if (STATIC_MODE_ENABLED) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-[12px] text-center'>
          <p className='text-[14px] font-medium text-[var(--text-primary)]'>
            {FEATURE_DISABLED_MESSAGE}
          </p>
          <p className='max-w-[400px] text-[12px] text-[var(--text-muted)]'>
           test mode .
          </p>
        </div>
      </div>
    )
  }

  return null
}
