# 🧑‍💻 Portafolio Personal — Cristian Lozada

Sitio web de portafolio personal desarrollado con HTML, CSS y JavaScript vanilla. Presenta mi experiencia profesional, proyectos destacados, stack tecnológico e información de contacto.

[![CI - Validate Portfolio](https://github.com/cristianlosada/portafolio_personal/actions/workflows/ci.yml/badge.svg)](https://github.com/cristianlosada/portafolio_personal/actions/workflows/ci.yml/badge.svg)
[![Deploy to GitHub Pages](https://github.com/cristianlosada/portafolio_personal/actions/workflows/deploy.yml/badge.svg)](https://github.com/cristianlosada/portafolio_personal/actions/workflows/deploy.yml)

---

## 🚀 Demo

🔗 [Ver portafolio en vivo](https://cristianlosada.github.io/portafolio_personal)

---

## 📁 Estructura del proyecto

```
portafolio_personal/
├── index.html              # Estructura principal del sitio
├── styles.css              # Estilos y diseño visual
├── script.js               # Lógica de interacción (cursor, scroll, menú)
├── assets/
│   ├── img/                # Imágenes del proyecto
│   └── Cristian_lozada_curriculumVitae.pdf
├── .github/
│   └── workflows/
│       ├── ci.yml          # Pipeline de validación HTML/CSS
│       └── deploy.yml      # Pipeline de despliegue a GitHub Pages
└── README.md
```

---

## 🛠️ Tecnologías usadas

| Categoría | Tecnologías |
|-----------|-------------|
| Markup & estilos | HTML5, CSS3 (variables, grid, flexbox) |
| Interactividad | JavaScript (vanilla) |
| Fuentes | Google Fonts — Poppins |
| Íconos | Font Awesome 6 |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## ⚙️ Pipelines CI/CD

### `ci.yml` — Validación continua
Se ejecuta en cada `push` o `pull_request` hacia `main`, `master` o `develop`:
- ✅ Valida el HTML con `html-validate`
- ✅ Lint del CSS con `stylelint`

### `deploy.yml` — Despliegue automático
Se ejecuta en cada `push` a `main` o `master`, o manualmente desde la pestaña **Actions**:
- 📦 Empaqueta el sitio estático
- 🚀 Despliega a **GitHub Pages**

---

## 🧩 Secciones del portafolio

- **Inicio** — Presentación y acceso rápido a proyectos y CV
- **Sobre mí** — Descripción profesional y estadísticas
- **Proyectos** — Proyectos destacados con tecnologías y enlaces
- **Stack tecnológico** — Tecnologías organizadas por categoría
- **Experiencia** — Timeline de experiencia profesional
- **Contacto** — Email, LinkedIn y teléfono

---

## 📌 Proyectos incluidos

| Proyecto | Descripción | Tecnologías |
|----------|-------------|-------------|
| [Personería de Baraya](https://www.personeriabarayahuila.co/) | Sitio institucional para ente de control municipal | Laravel, PHP, MySQL, Docker |
| [Quimint](https://quimint.com.co/) | Mantenimiento de software de despachos + App cotizador mobile | Laravel, Flutter, Dart, MySQL |
| [Disriegos](https://disriegos.vercel.app/) | Sistema de gestión de riego en cultivos | Vue.js, Python, PostgreSQL |
| Sistema agrícola | Análisis de suelos físico-químicos | Python, Flask, MySQL |

---

## 🖥️ Correr localmente

No requiere build ni dependencias. Solo abre el archivo en el navegador:

```bash
# Opción 1 — Abrir directamente
start index.html

# Opción 2 — Servidor local con Python
python -m http.server 3000
# Luego abre http://localhost:3000
```

---

## 📬 Contacto

| Canal | Enlace |
|-------|--------|
| 📧 Email | [cristianlosano314@gmail.com](mailto:cristianlosano314@gmail.com) |
| 💼 LinkedIn | [cristian-alejandro-lozada-reyes](https://linkedin.com/in/cristian-alejandro-lozada-reyes-6ab093162/) |
| 🐙 GitHub | [cristianlosada](https://github.com/cristianlosada) |
| 📞 Teléfono | +57 301 204 9492 |

---

## 📄 Licencia

Este proyecto es de uso personal. Si deseas usar alguna parte del diseño o código, por favor contáctame primero.
