export const getConsultaDurationByEspecialidade = (especialidade: string): number => {
    // Return duration in minutes based on especialidade
    const especialidadeLower = especialidade.toLowerCase()

    if (especialidadeLower.includes('psic')) return 60
    if (especialidadeLower.includes('neuro')) return 60
    if (especialidadeLower.includes('cardio')) return 30
    if (especialidadeLower.includes('ortop')) return 30
    if (especialidadeLower.includes('oftalmo')) return 30
    if (especialidadeLower.includes('derma')) return 30
    if (especialidadeLower.includes('gineco')) return 45
    if (especialidadeLower.includes('obstetr')) return 45
    
    // Default duration: 20 minutes (e.g. Clínico Geral)
    return 20
}
