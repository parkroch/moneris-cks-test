import {TestBed} from '@angular/core/testing';

import {MonerisService} from './moneris-service.service';

describe('MonerisServiceService', () => {
    let service: MonerisService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MonerisService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
