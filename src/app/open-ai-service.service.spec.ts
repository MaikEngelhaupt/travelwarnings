import { TestBed } from '@angular/core/testing';

import { OpenAiServiceService } from './open-ai-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OpenAiServiceService', () => {
  let service: OpenAiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OpenAiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
