'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PermissionGroupConfig } from '@/lib/permission-groups/types'

/**
 * Static configuration constants
 */
const STATIC_MODE_ENABLED = true
const EMPTY_PERMISSION_GROUPS: PermissionGroup[] = []
const EMPTY_MEMBERS: PermissionGroupMember[] = []
const DEFAULT_USER_CONFIG: UserPermissionConfig = {
  permissionGroupId: null,
  groupName: null,
  config: null,
}

export interface PermissionGroup {
  id: string
  name: string
  description: string | null
  config: PermissionGroupConfig
  createdBy: string
  createdAt: string
  updatedAt: string
  creatorName: string | null
  creatorEmail: string | null
  memberCount: number
  autoAddNewMembers: boolean
}

export interface PermissionGroupMember {
  id: string
  userId: string
  assignedAt: string
  userName: string | null
  userEmail: string | null
  userImage: string | null
}

export interface UserPermissionConfig {
  permissionGroupId: string | null
  groupName: string | null
  config: PermissionGroupConfig | null
}

export const permissionGroupKeys = {
  all: ['permissionGroups'] as const,
  list: (organizationId?: string) =>
    ['permissionGroups', 'list', organizationId ?? 'none'] as const,
  detail: (id?: string) => ['permissionGroups', 'detail', id ?? 'none'] as const,
  members: (id?: string) => ['permissionGroups', 'members', id ?? 'none'] as const,
  userConfig: (organizationId?: string) =>
    ['permissionGroups', 'userConfig', organizationId ?? 'none'] as const,
}

/**
 * Static implementation - returns empty array
 */
export function usePermissionGroups(organizationId?: string, enabled = true) {
  return useQuery<PermissionGroup[]>({
    queryKey: permissionGroupKeys.list(organizationId),
    queryFn: async () => EMPTY_PERMISSION_GROUPS,
    enabled: STATIC_MODE_ENABLED && Boolean(organizationId) && enabled,
    staleTime: 60 * 1000,
    initialData: EMPTY_PERMISSION_GROUPS,
  })
}

/**
 * Static implementation - returns null
 */
export function usePermissionGroup(id?: string, enabled = true) {
  return useQuery<PermissionGroup | null>({
    queryKey: permissionGroupKeys.detail(id),
    queryFn: async () => null,
    enabled: STATIC_MODE_ENABLED && Boolean(id) && enabled,
    staleTime: 60 * 1000,
    initialData: null,
  })
}

/**
 * Static implementation - returns empty array
 */
export function usePermissionGroupMembers(permissionGroupId?: string) {
  return useQuery<PermissionGroupMember[]>({
    queryKey: permissionGroupKeys.members(permissionGroupId),
    queryFn: async () => EMPTY_MEMBERS,
    enabled: STATIC_MODE_ENABLED && Boolean(permissionGroupId),
    staleTime: 30 * 1000,
    initialData: EMPTY_MEMBERS,
  })
}

/**
 * Static implementation - returns default config
 */
export function useUserPermissionConfig(organizationId?: string) {
  return useQuery<UserPermissionConfig>({
    queryKey: permissionGroupKeys.userConfig(organizationId),
    queryFn: async () => DEFAULT_USER_CONFIG,
    enabled: STATIC_MODE_ENABLED && Boolean(organizationId),
    staleTime: 60 * 1000,
    initialData: DEFAULT_USER_CONFIG,
  })
}

export interface CreatePermissionGroupData {
  organizationId: string
  name: string
  description?: string
  config?: Partial<PermissionGroupConfig>
  autoAddNewMembers?: boolean
}

/**
 * Static implementation - no-op mutation
 */
export function useCreatePermissionGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePermissionGroupData) => {
      if (STATIC_MODE_ENABLED) {
        return { success: true }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.list(variables.organizationId),
      })
    },
  })
}

export interface UpdatePermissionGroupData {
  id: string
  organizationId: string
  name?: string
  description?: string | null
  config?: Partial<PermissionGroupConfig>
  autoAddNewMembers?: boolean
}

/**
 * Static implementation - no-op mutation
 */
export function useUpdatePermissionGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdatePermissionGroupData) => {
      if (STATIC_MODE_ENABLED) {
        return { success: true }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.list(variables.organizationId),
      })
      queryClient.invalidateQueries({ queryKey: permissionGroupKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ['permissionGroups', 'userConfig'] })
    },
  })
}

export interface DeletePermissionGroupParams {
  permissionGroupId: string
  organizationId: string
}

/**
 * Static implementation - no-op mutation
 */
export function useDeletePermissionGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ permissionGroupId }: DeletePermissionGroupParams) => {
      if (STATIC_MODE_ENABLED) {
        return { success: true }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.list(variables.organizationId),
      })
      queryClient.invalidateQueries({ queryKey: ['permissionGroups', 'userConfig'] })
    },
  })
}

/**
 * Static implementation - no-op mutation
 */
export function useAddPermissionGroupMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { permissionGroupId: string; userId: string }) => {
      if (STATIC_MODE_ENABLED) {
        return { success: true }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.members(variables.permissionGroupId),
      })
      queryClient.invalidateQueries({ queryKey: permissionGroupKeys.all })
    },
  })
}

/**
 * Static implementation - no-op mutation
 */
export function useRemovePermissionGroupMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { permissionGroupId: string; memberId: string }) => {
      if (STATIC_MODE_ENABLED) {
        return { success: true }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.members(variables.permissionGroupId),
      })
      queryClient.invalidateQueries({ queryKey: permissionGroupKeys.all })
      queryClient.invalidateQueries({ queryKey: ['permissionGroups', 'userConfig'] })
    },
  })
}

export interface BulkAddMembersData {
  permissionGroupId: string
  userIds?: string[]
  addAllOrgMembers?: boolean
}

/**
 * Static implementation - no-op mutation
 */
export function useBulkAddPermissionGroupMembers() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ permissionGroupId, ...data }: BulkAddMembersData) => {
      if (STATIC_MODE_ENABLED) {
        return { added: 0, moved: 0 }
      }
      throw new Error('Not implemented in static mode')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: permissionGroupKeys.members(variables.permissionGroupId),
      })
      queryClient.invalidateQueries({ queryKey: permissionGroupKeys.all })
      queryClient.invalidateQueries({ queryKey: ['permissionGroups', 'userConfig'] })
    },
  })
}
