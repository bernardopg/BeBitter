import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProfileImage, PROFILE_IMAGE_SIZES } from '../ProfileImage';

describe('ProfileImage', () => {
  it('imagem prioritária renderiza visível (sem opacity-0), eager e com fetchpriority alto', () => {
    const { container } = render(<ProfileImage alt="Foto" priority />);

    const img = screen.getByAltText('Foto');
    expect(img).not.toHaveClass('opacity-0');
    expect(img).toHaveClass('opacity-100');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');

    // Placeholder com spinner não deve existir na primeira dobra
    expect(container.querySelector('.animate-spin')).toBeNull();
  });

  it('imagem lazy começa invisível e revela no evento load', () => {
    const { container } = render(<ProfileImage alt="Foto" />);

    const img = screen.getByAltText('Foto');
    expect(img).toHaveClass('opacity-0');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(container.querySelector('.animate-spin')).not.toBeNull();

    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
    expect(container.querySelector('.animate-spin')).toBeNull();
  });

  it('imagem já completa no mount (cache/bfcache) é revelada sem depender do evento load', () => {
    // Simula imagem em cache: complete === true ANTES do mount, então o
    // evento `load` nunca dispara. Sem o resgate via ref.complete, a foto
    // ficaria invisível para sempre (bug de visita repetida).
    const complete = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get');
    complete.mockReturnValue(true);

    render(<ProfileImage alt="Foto" />);

    const img = screen.getByAltText('Foto');
    expect(img).toHaveClass('opacity-100');

    complete.mockRestore();
  });

  it('erro de carregamento mostra estado de fallback', () => {
    render(<ProfileImage alt="Foto" />);
    const img = screen.getByAltText('Foto');

    fireEvent.error(img);

    expect(screen.getByText('Imagem não disponível')).toBeInTheDocument();
  });

  it('usa o sizes padrão alinhado ao hero nos <source>', () => {
    render(<ProfileImage alt="Foto" />);

    const sources = document.querySelectorAll('source');
    expect(sources.length).toBe(3);
    sources.forEach((source) => {
      expect(source).toHaveAttribute('sizes', PROFILE_IMAGE_SIZES);
      expect(source.getAttribute('srcSet')).toContain(
        '/images/profile/profile-',
      );
    });
  });
});
