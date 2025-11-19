import { ref } from 'vue'
import { useOnlineStatus } from './useOnlineStatus'
import { save, load } from '../../composables/useLocalStorage'

export function useOfflineData() {
  const { isOnline } = useOnlineStatus()
  const pendingSyncs = ref([])

  // Guardar acción para sincronizar cuando haya conexión
  const queueSync = (action) => {
    const syncs = load('pending_syncs') || []
    syncs.push({
      ...action,
      timestamp: Date.now()
    })
    save('pending_syncs', syncs)
    pendingSyncs.value = syncs
  }

  // Sincronizar cuando hay conexión
  const syncPendingActions = async () => {
    if (!isOnline.value) return

    const syncs = load('pending_syncs') || []
    if (syncs.length === 0) return

    console.log(`Sincronizando ${syncs.length} acciones pendientes...`)

    // Aquí iría la lógica de sincronización con servidor si existiera
    // Por ahora solo limpiamos la cola
    save('pending_syncs', [])
    pendingSyncs.value = []
  }

  return {
    isOnline,
    queueSync,
    syncPendingActions,
    pendingSyncs
  }
}
