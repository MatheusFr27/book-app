import { TestBed } from '@angular/core/testing';

import { AutorsService } from './autors.service';

describe('AutorsService', () => {
  let service: AutorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
