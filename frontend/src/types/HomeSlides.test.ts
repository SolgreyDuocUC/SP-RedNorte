import { describe, it, expect } from 'vitest';
import { slides, navItems, especialidades, examenes, centros } from './HomeSlides';

describe('HomeSlides Constants tests', () => {
  it('should validate slides structure and data', () => {
    expect(Array.isArray(slides)).toBe(true);
    expect(slides.length).toBe(3);

    slides.forEach(slide => {
      expect(slide).toHaveProperty('id');
      expect(slide).toHaveProperty('tag');
      expect(slide).toHaveProperty('title');
      expect(slide).toHaveProperty('body');
      expect(slide).toHaveProperty('cta');
      expect(slide).toHaveProperty('accent');
      
      expect(typeof slide.id).toBe('number');
      expect(typeof slide.tag).toBe('string');
      expect(typeof slide.title).toBe('string');
      expect(typeof slide.body).toBe('string');
      expect(typeof slide.cta).toBe('string');
      expect(typeof slide.accent).toBe('string');
    });
  });

  it('should validate navItems structure and data', () => {
    expect(Array.isArray(navItems)).toBe(true);
    expect(navItems.length).toBeGreaterThan(0);

    navItems.forEach(item => {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('dropdown');
      expect(typeof item.label).toBe('string');
      expect(typeof item.dropdown).toBe('boolean');
    });
  });

  it('should validate especialidades', () => {
    expect(Array.isArray(especialidades)).toBe(true);
    expect(especialidades.length).toBeGreaterThan(0);
    especialidades.forEach(esp => {
      expect(typeof esp).toBe('string');
    });
  });

  it('should validate examenes', () => {
    expect(Array.isArray(examenes)).toBe(true);
    expect(examenes.length).toBeGreaterThan(0);
    examenes.forEach(ex => {
      expect(typeof ex).toBe('string');
    });
  });

  it('should validate centros structure and data', () => {
    expect(Array.isArray(centros)).toBe(true);
    expect(centros.length).toBe(4);

    centros.forEach(centro => {
      expect(centro).toHaveProperty('nombre');
      expect(centro).toHaveProperty('ciudad');
      expect(centro).toHaveProperty('telefono');

      expect(typeof centro.nombre).toBe('string');
      expect(typeof centro.ciudad).toBe('string');
      expect(typeof centro.telefono).toBe('string');
    });
  });
});
