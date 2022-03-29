// drop in pressure from non-braking pressure at which braking is initiated
const BRAKING_THRESHOLD = 7 // psi

export const NON_BRAKING_PRESSURE = 90 // psi
export const MAX_BRAKING_PRESSURE = NON_BRAKING_PRESSURE - BRAKING_THRESHOLD // psi

// maximum age of an EOT transmission before it is considered gone
export const EOT_MAX_AGE_SECONDS = 120 // seconds
