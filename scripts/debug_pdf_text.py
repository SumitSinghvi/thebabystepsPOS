#!/usr/bin/env python3
"""Debug: Check what text PyMuPDF extracts from the PDF pages."""
import fitz

PDF_PATH = r"C:\Users\Sumit singhvi\Downloads\BSCatalogueFinal2026.pdf"

doc = fitz.open(PDF_PATH)
print(f"Total pages: {len(doc)}")

# Check first 10 pages
for i in range(min(10, len(doc))):
    page = doc[i]
    text = page.get_text("text").strip()
    print(f"\n--- Page {i+1} ---")
    print(repr(text[:300]) if text else "[NO TEXT]")

doc.close()
