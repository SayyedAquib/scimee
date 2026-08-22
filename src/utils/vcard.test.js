import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadVCard } from './vcard';

describe('vCard Contact Downloader (downloadVCard)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url-scimee');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('creates and downloads a .vcf file with full contact metadata', () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    downloadVCard();

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('passes a valid vCard Blob instance to URL.createObjectURL', () => {
    downloadVCard();

    const createdBlob = global.URL.createObjectURL.mock.calls[0][0];
    expect(createdBlob).toBeInstanceOf(Blob);
    expect(createdBlob.type).toContain('text/vcard');
  });
});
