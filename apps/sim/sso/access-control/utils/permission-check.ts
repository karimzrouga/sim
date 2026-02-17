import { createLogger } from '@sim/logger'
import type { PermissionGroupConfig } from '@/lib/permission-groups/types'
import type { ExecutionContext } from '@/executor/types'

const logger = createLogger('PermissionCheck')

/**
 * Static configuration constants for permission checks
 */
const ACCESS_CONTROL_ENABLED = false
const DEFAULT_PERMISSION_CONFIG: PermissionGroupConfig | null = null
const ALLOW_ALL_PROVIDERS = true
const ALLOW_ALL_INTEGRATIONS = true
const ALLOW_MCP_TOOLS = true
const ALLOW_CUSTOM_TOOLS = true
const ALLOW_SKILLS = true
const ALLOW_INVITATIONS = true

export class ProviderNotAllowedError extends Error {
  constructor(providerId: string, model: string) {
    super(
      `Provider "${providerId}" is not allowed for model "${model}" based on your permission group settings`
    )
    this.name = 'ProviderNotAllowedError'
  }
}

export class IntegrationNotAllowedError extends Error {
  constructor(blockType: string) {
    super(`Integration "${blockType}" is not allowed based on your permission group settings`)
    this.name = 'IntegrationNotAllowedError'
  }
}

export class McpToolsNotAllowedError extends Error {
  constructor() {
    super('MCP tools are not allowed based on your permission group settings')
    this.name = 'McpToolsNotAllowedError'
  }
}

export class CustomToolsNotAllowedError extends Error {
  constructor() {
    super('Custom tools are not allowed based on your permission group settings')
    this.name = 'CustomToolsNotAllowedError'
  }
}

export class SkillsNotAllowedError extends Error {
  constructor() {
    super('Skills are not allowed based on your permission group settings')
    this.name = 'SkillsNotAllowedError'
  }
}

export class InvitationsNotAllowedError extends Error {
  constructor() {
    super('Invitations are not allowed based on your permission group settings')
    this.name = 'InvitationsNotAllowedError'
  }
}

/**
 * Static implementation - returns default permission configuration
 * @param userId - User identifier (unused in static implementation)
 * @returns Always returns DEFAULT_PERMISSION_CONFIG
 */
export async function getUserPermissionConfig(
  userId: string
): Promise<PermissionGroupConfig | null> {
  if (!ACCESS_CONTROL_ENABLED) {
    return DEFAULT_PERMISSION_CONFIG
  }
  return DEFAULT_PERMISSION_CONFIG
}

/**
 * Static implementation - returns default permission configuration
 * @param userId - User identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 * @returns Always returns DEFAULT_PERMISSION_CONFIG
 */
export async function getPermissionConfig(
  userId: string | undefined,
  ctx?: ExecutionContext
): Promise<PermissionGroupConfig | null> {
  if (!userId) {
    return DEFAULT_PERMISSION_CONFIG
  }

  if (ctx) {
    if (ctx.permissionConfigLoaded) {
      return ctx.permissionConfig ?? DEFAULT_PERMISSION_CONFIG
    }

    ctx.permissionConfig = DEFAULT_PERMISSION_CONFIG
    ctx.permissionConfigLoaded = true
    return DEFAULT_PERMISSION_CONFIG
  }

  return DEFAULT_PERMISSION_CONFIG
}

/**
 * Static implementation - always allows all model providers
 * @param userId - User identifier (unused in static implementation)
 * @param model - Model identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 */
export async function validateModelProvider(
  userId: string | undefined,
  model: string,
  ctx?: ExecutionContext
): Promise<void> {
  if (!userId || ALLOW_ALL_PROVIDERS) {
    return
  }
}

/**
 * Static implementation - always allows all block types
 * @param userId - User identifier (unused in static implementation)
 * @param blockType - Block type identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 */
export async function validateBlockType(
  userId: string | undefined,
  blockType: string,
  ctx?: ExecutionContext
): Promise<void> {
  if (blockType === 'start_trigger' || !userId || ALLOW_ALL_INTEGRATIONS) {
    return
  }
}

/**
 * Static implementation - always allows MCP tools
 * @param userId - User identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 */
export async function validateMcpToolsAllowed(
  userId: string | undefined,
  ctx?: ExecutionContext
): Promise<void> {
  if (!userId || ALLOW_MCP_TOOLS) {
    return
  }
}

/**
 * Static implementation - always allows custom tools
 * @param userId - User identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 */
export async function validateCustomToolsAllowed(
  userId: string | undefined,
  ctx?: ExecutionContext
): Promise<void> {
  if (!userId || ALLOW_CUSTOM_TOOLS) {
    return
  }
}

/**
 * Static implementation - always allows skills
 * @param userId - User identifier (unused in static implementation)
 * @param ctx - Execution context (unused in static implementation)
 */
export async function validateSkillsAllowed(
  userId: string | undefined,
  ctx?: ExecutionContext
): Promise<void> {
  if (!userId || ALLOW_SKILLS) {
    return
  }
}

/**
 * Static implementation - always allows invitations
 * @param userId - User identifier (unused in static implementation)
 */
export async function validateInvitationsAllowed(userId: string | undefined): Promise<void> {
  if (!userId || ALLOW_INVITATIONS) {
    return
  }
}