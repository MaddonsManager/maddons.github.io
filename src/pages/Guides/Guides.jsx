import useBlogPost from '@/hook/useBlogPost'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardBody,
    Image,
    Tooltip,
    Spinner,
    Divider,
    Chip,
    CardHeader,
    Avatar,
    CardFooter,
    Link
} from '@nextui-org/react'

import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import { title, subtitle, SelectType, Searcher } from '@/components'
import { siteConfig } from '@/config/dirConfit'
import useFilterGuides from '@/hook/useFilterGuides'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'

const Guides = () => {
    const { post, error, isLoading } = useBlogPost()
    const { searchTerm, setSearchTerm, selectedTag, setSelectedTag, postTags, filteredData } =
        useFilterGuides(post)
    const { itemToShow, loadRef, scrollerRef, hasMore } = useInfiniteScrollLogic(filteredData)
    const navigate = useNavigate()

    return (
        <div className="justify-center inline-block max-w-4xl text-start">
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {post.posts.length > 0
                    ? `${post.posts.length} Private Guides`
                    : 'No Guides available'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
            <div className="flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    valueName={post.posts.map((item) => item.title)}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectType
                    selectedType={selectedTag}
                    setSelectedType={setSelectedTag}
                    valueType={postTags}
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
                                <Spinner>Loading Guides...</Spinner>
                            </div>
                        )}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap gap-4 content-center items-center justify-center">
                                <AnimatePresence>
                                    {filteredData.slice(0, itemToShow).map((post, index) => (
                                        <div
                                            key={`${index}-${post.title}`}
                                            className="transition-transform duration-300 ease-in-out hover:scale-105"
                                        >
                                            <Card
                                                isPressable={true}
                                                onPress={() => navigate(`/post/${post.folder}`)}
                                                isFooterBlurred
                                                initial="hidden"
                                                animate="visible"
                                                fallback
                                                shadow="sm"
                                                className="md:w-[400px] md:min-h-[446px]"
                                            >
                                                <CardHeader className="relative bg-transparent h-[200px] mb-6">
                                                    <Image
                                                        removeWrapper
                                                        isZoomed
                                                        alt={post.title}
                                                        radius="sm"
                                                        src={`${siteConfig.links.Blog}/blogposts/${post.folder}/${post.cover_image}`}
                                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                                    />
                                                    <Avatar
                                                        isBordered
                                                        color="default"
                                                        alt={post.author.name}
                                                        src={`${siteConfig.links.Blog}/blogposts/${post.folder}/${post.author.avatar}`}
                                                        size="lg"
                                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-16 z-10"
                                                    />
                                                    <Chip
                                                        className="translate-y-24 z-10"
                                                        color="warning"
                                                        variant="faded"
                                                        radius="sm"
                                                    >
                                                        @{post.author.name}
                                                    </Chip>
                                                </CardHeader>
                                                <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap md:h-full">
                                                    <div className="px-4 flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="text-large font-medium">
                                                                {post.title}
                                                            </h3>
                                                            <Tooltip
                                                                content="Copy WA to clipboard"
                                                                color="primary"
                                                            ></Tooltip>
                                                        </div>
                                                        <Divider />
                                                        <div className="flex flex-wrap gap-3 pt-2 text-small text-default-400 mb-4">
                                                            <p>
                                                                {post.description.length > 150
                                                                    ? `${post.description.substring(
                                                                          0,
                                                                          200
                                                                      )}...`
                                                                    : post.description}{' '}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col justify-start items-start gap-2">
                                                            <Link
                                                                href={`mailto:${post.author.email}`}
                                                                underline="hover"
                                                                size="sm"
                                                                isExternal
                                                                showAnchorIcon
                                                            >
                                                                Email
                                                            </Link>
                                                            <Link
                                                                href={post.author.url}
                                                                underline="hover"
                                                                size="sm"
                                                                isExternal
                                                                showAnchorIcon
                                                            >
                                                                Profile
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                                <CardFooter className="flex flex-col gap-4">
                                                    <Divider />
                                                    <div className="flex justify-between items-center w-full">
                                                        <div className="flex flex-wrap gap-2">
                                                            {post.tags.map &&
                                                                post.tags.map((tags, index) => (
                                                                    <Chip
                                                                        key={index}
                                                                        color="warning"
                                                                        variant="dot"
                                                                        size="sm"
                                                                        className="my-1"
                                                                    >
                                                                        {tags}
                                                                    </Chip>
                                                                ))}
                                                        </div>
                                                        <span className="text-tiny text-default-400">
                                                            date: {post.date}
                                                        </span>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </AnimatePresence>
                            </div>
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

export default Guides
