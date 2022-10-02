import React from 'react'
import { ListItemButton } from '@mui/material'

import { IMenuItem } from '@interfaces/menu-item'

interface SimpleMenuItemProps {
  item: IMenuItem
  isSidebarOpened: boolean
  onItemClick?: (item: IMenuItem) => void
}

export const SimpleMenuItem: React.FC<SimpleMenuItemProps> = ({ item, isSidebarOpened, onItemClick }) => {
  const handleItemClick = (item: IMenuItem) => {
    onItemClick && onItemClick(item)
  }

  return (
    <ListItemButton className={`rounded-md w-full hover:bg-skin-subsidiary`} onClick={() => handleItemClick(item)}>
      {item.icon}
      <span className={`${!isSidebarOpened && 'hidden'} origin-left duration-200 text-skin-main`}>{item.title}</span>
    </ListItemButton>
  )
}
