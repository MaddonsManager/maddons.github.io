import useWeakAurasData from '@/hook/useWeakAurasData'
import useFilteredData from '@/hook/useFilteredData'
import {
    title,
    subtitle,
    Searcher,
    SelectType,
    SelectVersion,
    ProfilesDetails,
    ItemList
} from '@/components'
import { siteConfig } from '@/config/dirConfit'
import { Divider, Spinner, useDisclosure } from '@nextui-org/react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'

const WeakAuras = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { data, isLoading, error } = useWeakAurasData()
    const {
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
    } = useFilteredData(data, onOpen)
    const { itemToShow, loadRef, scrollerRef, hasMore } = useInfiniteScrollLogic(filteredData)

    return (
        <div className="justify-center inline-block max-w-4xl text-start">
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {data.length > 0 ? `${data.length} Private WeakAuras` : 'No WeakAuras available'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
            {isOpen && (
                <ProfilesDetails data={selectedItem} isOpen={isOpen} onOpenChange={onOpenChange} />
            )}
            <div className=" flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    valueName={data.map((item) => item.title)}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectVersion
                    version={version}
                    setVersion={setVersion}
                    valueType={uniqueExpansions}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectType
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    valueType={dataTypes}
                />
            </div>
            <div className="h-[calc(95vh-32px)]">
                <div className=" h-full mx-auto mb-4">
                    <ScrollShadow
                        ref={scrollerRef}
                        className="h-[calc(93vh-32px)] overflow-auto mb-4 p-2 shadow-sm"
                        sh
                    >
                        {isLoading && (
                            <div className="flex justify-center mt-4">
                                <Spinner>Loading WeakAuras...</Spinner>
                            </div>
                        )}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <ItemList
                                data={filteredData}
                                onOpenDetails={handleOpenDetails}
                                handleCopyToClipboard={handleCopyToClipboard}
                                itemToShow={itemToShow}
                            />
                        ) : null}
                        {hasMore && (
                            <div ref={loadRef} className="flex justify-center mt-4">
                                <Spinner color="primary" />
                            </div>
                        )}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}

export default WeakAuras
