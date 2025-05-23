export type ListLandingPageUpdate = {
    background: string,
    corlogo: string,
    cortexto: string,
    cortitulo: string,
    date_end: string,
    date_ini: string,
    id: number,
    imagem: string,
    imgtexto: string,
    publish: number,
    text: string,
    theme: string,
    title: string,
    leads: number,
    vehicle: [{
        vehicles: string,
        anofabricacao: string,
        anomodelo: string,
        km: string,
        potencia: string,
        cambio_nome: string,
        consumourbano: string,
        consumorodoviario: string,
        valorpromocao: string,
        valorvenda: string,
        tipo_slug: string,
        marca_slug: string,
        modelo_slug: string,
        id: number,
        foto: string
    }]
}