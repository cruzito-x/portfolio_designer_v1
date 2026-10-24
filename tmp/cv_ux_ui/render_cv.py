"""Run the packaged DOCX rasterizer with a PDF exported by native Microsoft Word.

Windows has Word installed and no LibreOffice. Only the conversion stage is
adapted; page rasterization and OOXML page sizing use the packaged renderer.
"""
import importlib.util
import sys
import tempfile
from pathlib import Path

root = Path(__file__).resolve().parents[2]
render_temp = root / "tmp/cv_ux_ui/renderer-temp"
render_temp.mkdir(parents=True, exist_ok=True)
tempfile.tempdir = str(render_temp)
docx = root / "output/docx/David_Cruz_CV_Diseno_UX_UI.docx"
pdf = root / "output/pdf/David_Cruz_CV_Diseno_UX_UI.pdf"
renderer = Path("C:/Users/dcruz/.codex/plugins/cache/openai-primary-runtime/documents/26.1022.11436/skills/documents/render_docx.py")
assert pdf.exists() and pdf.stat().st_mtime >= docx.stat().st_mtime, "Export the current DOCX to PDF first"
spec = importlib.util.spec_from_file_location("packaged_docx_renderer", renderer)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.convert_to_pdf = lambda *args, **kwargs: (str(pdf), "PDF exported from the current DOCX using Microsoft Word")
sys.argv = [str(renderer), str(docx), "--output_dir", str(root / "tmp/cv_ux_ui/render"), "--dpi", "150"]
module.main()
