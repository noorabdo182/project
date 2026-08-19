import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Book } from './pages/book/book';
import { borrow } from './pages/borrow/borrow';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'books',
    component: Book
  },

  {
    path: 'borrow',
    component: borrow
  }

];