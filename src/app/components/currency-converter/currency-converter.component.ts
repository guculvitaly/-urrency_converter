import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit {
  exchangeRates: any = {};
  fromCurrency: string = 'USD';
  toCurrency: string = 'UAH';
  fromAmount: number = 1;
  toAmount!: number;

  currencies = ['USD', 'EUR', 'UAH'];


  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      this.exchangeRates = data.conversion_rates;
      this.convertFrom();
    });
  }

  convertFrom(): void {
    const fromRate = this.exchangeRates[this.fromCurrency];
    const toRate = this.exchangeRates[this.toCurrency];
    this.toAmount = (this.fromAmount / fromRate) * toRate;
  }

  convertTo(): void {
    const fromRate = this.exchangeRates[this.fromCurrency];
    const toRate = this.exchangeRates[this.toCurrency];
    this.fromAmount = (this.toAmount * fromRate) / toRate;
  }

  onCurrencyChange(): void {
    this.convertFrom();
  }
}
