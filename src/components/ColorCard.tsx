'use client'

import { ColorInfo } from '@/util/color'
import { removeHash } from '@/util/colorFormat'
import clsx from 'clsx'
import { wcagContrast } from 'culori'
import Link from 'next/link'
import Copyable from './Copyable'

interface ColorCardProps {
    data: ColorInfo
}

export default function ColorCard({ data }: ColorCardProps) {
    const { hex, name, hsl } = data
    const theme = wcagContrast(hex, '#fff') > 3 ? 'light' : 'dark'
    const borderColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 3.33}%)`
    const textColor = theme === 'dark' ? 'text-black/90' : 'text-white/90'

    const { r, g, b } = data.percent
    const predominant =
        r > g && r > b ? 'vermelha' : g > r && g > b ? 'verde' : b > r && b > g ? 'azul' : null

    return (
        <div
            className='relative w-full h-72 rounded-2xl p-4 border-4'
            style={{ backgroundColor: hex, borderColor }}
        >
            <div
                className={clsx(
                    'flex w-full items-center justify-between font-semibold text-lg',
                    textColor
                )}
            >
                <Link
                    className='text-4xl hover:opacity-75 transition-opacity'
                    href={`/${removeHash(hex)}`}
                >
                    {name}
                </Link>
                <Copyable value={hex} />
            </div>
            <div
                className={clsx(
                    'absolute bottom-0 left-0 p-4 w-full opacity-90 text-lg',
                    textColor
                )}
            >
                <p>
                    {data.name} é composta por {r}% de vermelho, {g}% de verde e {b}% de azul.{' '}
                    {predominant ? `Contém majoritariamente a cor ${predominant}.` : null}
                </p>
            </div>
        </div>
    )
}