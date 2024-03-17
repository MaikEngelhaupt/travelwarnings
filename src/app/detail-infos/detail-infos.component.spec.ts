import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfosComponent } from './detail-infos.component';
import { RiskCountry } from '../risk-country';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIcon } from '@angular/material/icon';

describe('DetailInfosComponent', () => {
  let component: DetailInfosComponent;
  let fixture: ComponentFixture<DetailInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailInfosComponent],
      imports: [
        HttpClientTestingModule,
        MatIcon
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a close button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('chevron_right');
  });


  it('should call the close method when the close button is clicked', () => {
    spyOn(component, 'close');
    const closeButton = fixture.debugElement.nativeElement.querySelector('button');
    closeButton.click();
    expect(component.close).toHaveBeenCalled();
  });

});
