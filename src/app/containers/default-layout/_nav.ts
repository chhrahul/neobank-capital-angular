import { INavData } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon';
export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Transactions',
    url: '/transactions',
    iconComponent: { name: 'cil-list' },
  },
  {
    name: 'Payments',
    url: '/payments',
    iconComponent: { name: 'cil-CreditCard' },
    children: [
      {
        name: 'Requests',
        url: '/requests',
      },
      {
        name: 'Recipients',
        url: '/recipients'
      },
      {
        name: 'Wire Drawdowns',
        url: '/wire-drawdowns'
      },
    ]
  },
  {
    name: 'Cards',
    url: '/cards',
    iconComponent: { name: 'cil-CreditCard' },
  },
  {
    name: 'Capital',
    url: '/capitals',
    iconComponent: { name: 'cil-CreditCard'},
  },
  {
    name: 'Accounts',
    url: '/accounts',
    iconComponent: { name: 'cil-user' },
  },
];
