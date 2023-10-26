import React, { FC } from 'react'
import * as Icons from '@mui/icons-material'

export type IconNames = keyof typeof Icons
export type Props = {
  iconName: IconNames
  className?: string
}

export const IconComponent = (props: Props) => {
  const Icon = Icons[props.iconName]
  return <Icon className={props.className} />
}