#!/usr/bin/env python3
"""Inspect the BSCatalogueFinal2026.pdf to understand its structure."""
import fitz  # PyMuPDF

PDF_PATH = r"C:\Users\Sumit singhvi\Downloads\BSCatalogueFinal2026.pdf"

doc = fitz.open(PDF_PATH)
print(f"Total pages: {len(doc)}")
print("=" * 60)

for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text("text").strip()
    
    # Get image list on this page
    images = page.get_images(full=True)
    
    print(f"\n--- Page {page_num + 1} ---")
    print(f"Images on page: {len(images)}")
    if text:
        # Show first 400 chars of text
        print(f"Text (first 400 chars):\n{text[:400]}")
    else:
        print("No text found")
    print()

doc.close()
