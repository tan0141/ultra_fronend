export interface Device{
	id: string
	name: string
	status: number | null
	intervalTime: number | null
	enable: number | null
	notiTopic: string | null
	productId: number
	warrantyId: number | null
	firmware: number | null
	ota_firmware: string | null
	rssi: number | null
	offset: number
	is_sync_interval: number
	is_sync_offset: number
	is_sync_ota: number
	createAt: Date
}