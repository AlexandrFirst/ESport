import { IMenuItem } from '@interfaces/menu-item'

import AdbIcon from '@mui/icons-material/Adb'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'

export const useMenu = () => {
  const menu: IMenuItem[] = [
    { title: 'Test', icon: <AdbIcon className='mr-3' />, link: '/test' },
    { title: 'Account', icon: <AccountBoxIcon className='mr-3' />, link: '/account' },
    {
      title: 'Analytics',
      icon: <AdbIcon className='mr-3' />,
      gap: true,
      items: [
        {
          title: 'Dashboard',
          icon: <AccountBoxIcon className='mr-3' />,
          link: '/test',
        },
        {
          title: 'Accounant',
          icon: <AdbIcon className='mr-3' />,
          link: '/accountant',
        },
        {
          title: 'Settings',
          icon: <AccountBoxIcon className='mr-3' />,
          link: '/settings',
        },
      ],
    },
    { title: 'Settings', icon: <SettingsIcon className='mr-3' />, link: '/settings' },
  ]

  return { menu }
}