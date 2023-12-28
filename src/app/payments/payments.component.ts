import { Component, ViewEncapsulation,ViewChild } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExportService } from '../export.service';
import {ThemePalette} from '@angular/material/core';
export interface TaskSet  {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: TaskSet[];
  allComplete?: boolean;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent {
/*****EXPORT DATA FROM TRANSACTION AND DISPLAY DATA */
dataToExport =
[
  { date: 'Dec 15', To: { name: 'John Doe', imageUrl: '../../assets/images/images.jpg' }, amount: '$229.37', Account: 'Ops / Payroll', 'Payment Method': 'Jane B. ••4928',Attachment:'+',showDate: false },
  { date: 'Dec 25', To: { name: 'John Doe', imageUrl: '../../assets/images/images.jpg' }, amount: '$988.82', Account: 'Ops / Payroll', 'Payment Method': 'Jane B. ••4928' ,Attachment:'+' ,showDate: false},
  { date: 'Dec 11', To:{ name: 'John Doe', imageUrl: '../../assets/images/images.jpg' }, amount: '900', Account: 'Ops / Payroll', 'Payment Method': 'Landon S. ••4929',Attachment:'+' ,showDate: false },
  { date: 'Dec 11', To:{ name: 'John Doe', imageUrl: '../../assets/images/images.jpg' }, amount: '800', Account: 'Ops / Payroll', 'Payment Method': 'Landon S. ••4929',Attachment:'+'  ,showDate: false},
  { date: 'Dec 11', To:{ name: 'John Doe', imageUrl: '../../assets/images/images.jpg' }, amount:' 800', Account: 'Ops / Payroll', 'Payment Method': 'Landon S. ••4929',Attachment:'+'  ,showDate: false},
];

constructor(private exportService: ExportService) {


}


isCardVisible = false;
toggleCardVisibility() {
  this.isCardVisible = !this.isCardVisible;
}
exportData(): void {
  this.exportService.exportToCsv(this.dataToExport, 'exported_data.csv');
}
hoveredColumn: string | null = null;
showDate: boolean = false;
displayedColumns: string[] = ['date', 'To', 'amount', 'Account', 'Payment Method','Attachment'];
dataSource = new MatTableDataSource<any>(this.dataToExport);
hoveredRow: any = null;
@ViewChild(MatSort, { static: true }) sort!: MatSort;

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}
onMouseOver(row: any): void {
  row.isHovered = true;
}
onMouseLeave(row: any): void {
  row.isHovered = false;
}
isShowDate(row: any): boolean {
  return row === this.dataSource.data[0] || row.isHovered;
}


// FILTER KEYWORD DATA
selected: any;
selectedList: any = [];
@ViewChild("shoes") shoes: any = [];
typesOfShoes: any[] = ["Jason Green", "Lighthouse Properties", "Domestic Ads", "Aliyah McMahon", "Jordi O'Donnell","Catherine Ndereba","Jerick Cheung"];
shoesSet = new Map();
filteredOptions:any[] =  ["Jason Green", "Lighthouse Properties", "Domestic Ads", "Aliyah McMahon", "Jordi O'Donnell","Catherine Ndereba","Jerick Cheung"] ;
//keyword filter
searchTerm: string = '';
onSearch() {
  this.filteredOptions = this.typesOfShoes.filter(item =>
    item.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
selectionChange($event: any) {
  this.shoesSet.set(
    $event.option.value,
    !this.shoesSet.get($event.option.value)
  );
}
// FILTER KEYWORD DATA END


//FILTER GL CODE
selectedg: any;
selectedListg: any = [];
@ViewChild("glcodes") glcodes: any = [];
typesOfGl: any[] = [
                "120 - Accounts Receivable",
                "620 - Entertainment",
                "664 - Utilities",
                "668 - Wages and Salaries",
              ];
glSet = new Map();
filteredGl: any[] = [];
searchGl: string = '';
ngOnInit() {
  this.filteredGl = this.typesOfGl.slice();
}
onSearchGl() {
  this.filteredGl = this.typesOfGl.filter(item =>
    item.toLowerCase().includes(this.searchGl.toLowerCase())
  );
}

selectionChangeGl($event: any) {
  this.glSet.set(
    $event.option.value,
    !this.glSet.get($event.option.value)
  );
}

allOptionsSelected: boolean = false;//GL selectAll
selectAll() {
  this.allOptionsSelected = !this.allOptionsSelected;
  this.glSet.clear();
  this.typesOfGl.forEach(glcode => {
    this.glSet.set(glcode, this.allOptionsSelected);
  });
  this.selectedg = this.allOptionsSelected ? Array.from(this.glSet.keys()) : [];
  this.selectionChangeGl({ option: { value: undefined } });
}
//FILTER GL CODE

/*****Cards Filter*****/
searchCard: string = '';
cards: any[] = [
  {
    label: 'Your Cards',
    items: [
      'Jane B. ••1234',
      'Jane B. ••1231',
      'Jane B. ••1233',
      'Jane B. ••1222'
    ]
  },
  {
    label: 'Others Cards',
    items: [
      'Aluna T. ••0330',
      'Jessica A. ••9914',
      'Landon S. ••4929',
      'Aluna T. ••0330'
    ]
  },
  {
    label: 'Cancelled Cards',
    items: [
      'Landon S. ••4929',
      'Aluna T. ••0330',
      'Landon S. ••4929',
      'Aluna T. ••0330'
    ]
  }
];
filteredCards: any[] = [];

onSearchCardChange(): void {
  this.filteredCards = this.cards.filter(section =>
    section.label.toLowerCase().includes(this.searchCard.toLowerCase()) ||
    section.items.some((item: string) => item.toLowerCase().includes(this.searchCard.toLowerCase()))
  );
}

 /**** Option values array for Accounts*/
 isTrade: boolean = false
 checkAllTrades: boolean = false
 trade = [
   { label: 'Ops / Payroll', selected: false, disabled: false },
   { label: 'Checking ••4311', selected: false, disabled: false },
   { label: 'AP', selected: false, disabled: false },
   { label: 'AR', selected: false, disabled: false },
   { label: 'Checking ••0297', selected: false, disabled: false },
   { label: 'Treasury', selected: false, disabled: false },
   { label: 'Credit', selected: false, disabled: false },
 ];

 changeTradesByCategory(event: Event) {
   if ((event.target as HTMLInputElement).name === 'trades') {
     this.isTrade = true;
   }
   if (this.isTrade && this.checkAllTrades) {
     (event.target as HTMLInputElement).checked = true;
   }
 }
 allTrades(event: Event) {
   const checked = (event.target as HTMLInputElement).checked;
   this.trade.forEach(item => (item.selected = checked));
 }
 /**** Option values array for Methods */

 taskSets: TaskSet[] = [
  {
    name: 'ACH',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Mercury Payment', completed: false, color: 'primary'},
      {name: 'Mercury Transfer', completed: false, color: 'accent'},
      {name: 'ACH In', completed: false, color: 'warn'},
      {name: 'ACH Pull', completed: false, color: 'warn'}
    ]
  },
  {
    name: 'Wire',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Wire In', completed: false, color: 'primary'},
      {name: 'Wire Out(International)', completed: false, color: 'accent'},
      {name: 'Wire Out(Domestic)', completed: false, color: 'warn'},
    ]
  },
  {
    name: 'Card',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Debit Card', completed: false, color: 'primary'},
      {name: 'Credit Card', completed: false, color: 'accent'},
      {name: 'Credit Account Payment', completed: false, color: 'warn'},
      {name: 'Credit Cashback Deposit', completed: false, color: 'warn'},
    ]
  },
  {
    name: 'Check',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Check Payment', completed: false, color: 'primary'},
      {name: 'Check Deposit', completed: false, color: 'accent'},
    ]
  },
  {
    name: 'Treasury Transfer',
    completed: false,
    color: 'primary',
  },
  {
    name: 'Venture Debt Transfer',
    completed: false,
    color: 'primary',
  },
  {
    name: 'Payment Request',
    completed: false,
    color: 'primary',
  },
   {
    name: 'Capital Growth',
    completed: false,
    color: 'primary',
  },
]

  allComplete: boolean = false;
  updateAllComplete(taskSet:TaskSet) {
    taskSet.allComplete = taskSet.subtasks != null && taskSet.subtasks.every(t => t.completed);
  }
  someComplete(taskSet: TaskSet): boolean {
    if (taskSet.subtasks == null) {
      return false;
    }
    return taskSet.subtasks.filter(t => t.completed).length > 0 && !taskSet.allComplete;
  }
  setAll(taskSet: TaskSet, completed: boolean) {
    taskSet.allComplete = completed;
    if (taskSet.subtasks == null) {
      return;
    }
    taskSet.subtasks.forEach(t => t.completed = completed);
  }
/**** Option values array for Methods END*/


}



