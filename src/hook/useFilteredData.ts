import { useState, useMemo } from 'react'
import { StringItems } from '@/types'

const useFilteredData = (data: StringItems[], onOpen: () => void) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [version, setVersion] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<StringItems | null>(null)

    const uniqueExpansions = useMemo(() => {
        if (!data || data.length === 0) return []
        return Array.from(new Set(data.flatMap((item) => item.expansion)))
    }, [data])

    const dataTypes = useMemo(() => {
        return Array.from(new Set(data.flatMap((item) => item.tags)))
    }, [data])

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = searchTerm
                ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            const matchesType = selectedType ? item.tags.includes(selectedType) : true
            const matchesExpansion = version ? item.expansion.includes(version) : true
            return matchesSearch && matchesType && matchesExpansion
        })
    }, [data, searchTerm, selectedType, version])

    const handleCopyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content)
    }

    const handleOpenDetails = (item: StringItems) => {
        setSelectedItem(item)
        onOpen()
    }

    return {
        searchTerm,
        setSearchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        uniqueExpansions,
        dataTypes,
        filteredData,
        handleCopyToClipboard,
        handleOpenDetails,
        selectedItem
    }
}

export default useFilteredData
