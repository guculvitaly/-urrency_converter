import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  exchangeRates: any;
  uahToUsd: number | undefined;
  uahToEur: number | undefined;

  constructor(private currencyService: CurrencyService) {}


  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      this.uahToUsd = data.conversion_rates['USD'];
      this.uahToEur = data.conversion_rates['EUR'];
    });
  }
}
