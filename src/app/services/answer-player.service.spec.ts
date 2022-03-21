import { TestBed } from '@angular/core/testing';

import { AnswerPlayerService } from './answer-player.service';

describe('AnswerPlayerService', () => {
  let service: AnswerPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
