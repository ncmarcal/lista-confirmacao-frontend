import { TestBed } from '@angular/core/testing';

import { AuthGuardUsuario } from './auth-guard-usuario.service';

describe('AuthGuardUsuario', () => {
  let guard: AuthGuardUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardUsuario);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
