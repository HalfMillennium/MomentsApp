import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ChipToggle } from './utils';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'chip-toggle-set',
  templateUrl: './chip-toggle-set.component.html',
  styleUrls: ['./chip-toggle-set.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class ChipToggleSet {
  @Input() chipSet?: ChipToggle[];

  toggleChip(chip: ChipToggle) {
    chip.checked = !chip.checked;
  }
}
