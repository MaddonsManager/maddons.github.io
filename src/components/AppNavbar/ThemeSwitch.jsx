import { VisuallyHidden, useSwitch, Divider } from '@nextui-org/react'
import { MoonIcon, SunIcon } from '@/utils/icons'
import { useTheme } from '@nextui-org/use-theme'
import { useEffect } from 'react'

const ThemeSwitch = (props) => {
    const { theme, setTheme } = useTheme()
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [setTheme])
    const isSelected = theme === 'dark'
    const handleChange = () => {
        const newTheme = isSelected ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }
    const { Component, slots, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
        ...props,
        isSelected,
        onChange: handleChange
    })

    return (
        <>
            <Divider orientation="vertical" className="h-auto mr-4 ml-2" />
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            'w-8 h-8',
                            'flex items-center justify-center',
                            'rounded-lg bg-default-500 hover:bg-default-200'
                        ]
                    })}
                >
                    {isSelected ? <SunIcon /> : <MoonIcon />}
                </div>
            </Component>
        </>
    )
}

export default ThemeSwitch
