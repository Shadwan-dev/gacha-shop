markdown

# 🏛️ MEMORIA VIVA

## Multimedia Interactiva para la Interpretación del Patrimonio Cultural de Baracoa

---

### 📌 Descripción del Proyecto

**"Memoria Viva"** es una aplicación multimedia interactiva diseñada para funcionar **offline** en entornos con conectividad limitada o nula, pensada especialmente para el contexto cubano. Desarrollada con tecnologías web modernas (React + TypeScript + Tailwind CSS), la aplicación puede almacenarse y ejecutarse desde cualquier dispositivo de almacenamiento extraíble (USB, disco duro externo) sin necesidad de instalación compleja ni conexión a internet.

La propuesta integra **cinco módulos fundamentales** que articulan el patrimonio tangible e intangible de Baracoa:

| Módulo | Contenido | Estado |
|--------|-----------|--------|
| 🏛️ **Historia** | Línea de tiempo con 42 hitos históricos (1511-2026) | ✅ Completado |
| 🏠 **Patrimonio Tangible** | Inventario de 34 bienes inmuebles del Centro Histórico Urbano | ✅ 17/34 registrados |
| 🎭 **Patrimonio Intangible** | Tradiciones, música, danza, festividades, gastronomía y oralidad | ✅ 17 tradiciones |
| 📚 **Interpretación** | Conceptos fundamentales y preguntas frecuentes sobre patrimonio | ✅ Completado |
| 🎮 **Juegos Didácticos** | 4 juegos interactivos para reforzar el aprendizaje | ✅ Completado |

---

### 🎯 Objetivo General

Fortalecer la interpretación del patrimonio cultural de Baracoa mediante una herramienta tecnológica offline que sensibilice, capacite y movilice a la comunidad en favor de su conservación.

---

### 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Biblioteca para la construcción de la interfaz de usuario |
| **TypeScript** | 5.9.3 | Tipado estático para un código más robusto |
| **Tailwind CSS** | 3.4.19 | Estilizado rápido y consistente |
| **Vite** | 8.0.0 | Herramienta de build y servidor de desarrollo |
| **PostCSS** | 8.5.8 | Procesamiento de CSS |
| **Autoprefixer** | 10.4.27 | Compatibilidad entre navegadores |

---

### 🎨 Paleta de Colores (Identidad Visual)

| Nombre | Código Hex | Uso |
|--------|------------|-----|
| **Oro Patrimonial** | `#C9A03D` | Títulos, acentos, botones principales |
| **Terracota Baracoense** | `#B85C38` | Botones secundarios, detalles cálidos |
| **Verde Yara** | `#2D6A4F` | Naturaleza, paisajes, patrimonio tangible |
| **Azul Mar Caribe** | `#1B4965` | Fondos de módulos, agua, cielo |
| **Beige Colonial** | `#F5E6D3` | Fondos de tarjetas, áreas de texto |
| **Gris Piedra** | `#4A4A4A` | Textos secundarios, bordes |
| **Madera Antigua** | `#6B3E1B` | Elementos históricos, maderas |

---

### 📁 Estructura del Proyecto

memoria-viva/
├── public/
│ └── images/
│ └── baracoa-malecon-bg.jpg # Fondo principal de la aplicación
├── src/
│ ├── components/
│ │ ├── layout/
│ │ │ └── MenuPrincipal.tsx # Menú principal con 5 módulos
│ │ ├── historia/
│ │ │ └── LineaTiempo.tsx # Línea de tiempo con 42 hitos
│ │ ├── patrimonio/
│ │ │ ├── ModuloPatrimonio.tsx # Patrimonio tangible
│ │ │ ├── ModuloIntangible.tsx # Patrimonio intangible
│ │ │ ├── MapaInteractivo.tsx # Filtros y grid de bienes
│ │ │ ├── FichaBien.tsx # Modal con detalles del bien
│ │ │ ├── TarjetaTradicion.tsx # Tarjeta resumen de tradición
│ │ │ └── FichaTradicion.tsx # Modal con detalles de tradición
│ │ ├── interpretacion/
│ │ │ ├── ModuloInterpretacion.tsx # Conceptos y preguntas frecuentes
│ │ │ ├── TarjetaConcepto.tsx # Tarjeta expandible de concepto
│ │ │ └── PreguntaFrecuente.tsx # Acordeón de preguntas
│ │ └── juegos/
│ │ ├── ModuloJuegos.tsx # Selección de juegos
│ │ ├── QuizGame.tsx # Juego de preguntas y respuestas
│ │ ├── MemoriaGame.tsx # Juego de memoria (pares)
│ │ ├── RuletaGame.tsx # Ruleta de categorías
│ │ └── SopaLetrasGame.tsx # Sopa de letras patrimonial
│ ├── data/
│ │ ├── hitosBaracoa.ts # 42 hitos históricos
│ │ ├── bienesPatrimoniales.ts # 17 bienes inmuebles
│ │ ├── tradicionesBaracoa.ts # 17 tradiciones
│ │ ├── conceptosPatrimonio.ts # 5 conceptos + 6 preguntas
│ │ └── juegosData.ts # Datos de juegos
│ ├── types/
│ │ └── index.ts # Tipos TypeScript
│ ├── styles/
│ │ └── index.css # Estilos globales Tailwind
│ ├── App.tsx # Componente principal
│ └── main.tsx # Punto de entrada
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── README.md
text


---

### 🚀 Instalación y Ejecución

#### Requisitos previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

#### Pasos para ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/memoria-viva.git

# 2. Acceder al directorio
cd memoria-viva

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Construir para producción (genera carpeta /dist)
npm run build

La aplicación estará disponible en http://localhost:5173
📦 Build para Distribución Offline
bash

# Generar build de producción
npm run build

# El contenido de la carpeta /dist puede ser:
# - Copiado a un USB
# - Distribuido en computadoras sin conexión
# - Alojado en servidores locales

🎮 Juegos Incluidos
Juego	Descripción	Dificultad
📝 ¿Qué sabes de Baracoa?	Cuestionario de 10 preguntas sobre historia y patrimonio	Medio
🃏 Memoria Baracoense	Encuentra las parejas de monumentos y tradiciones	Fácil
🎡 Ruleta del Patrimonio	Gira la ruleta y responde preguntas por categorías	Difícil
🔍 Sopa de Letras	Encuentra palabras relacionadas con Baracoa	Fácil
📊 Contenido por Módulo
Módulo	Cantidad	Descripción
Historia	42 hitos	Eventos desde 1511 hasta 2026
Patrimonio Tangible	17 bienes	Iglesias, fortalezas, edificios civiles, viviendas vernáculas
Patrimonio Intangible	17 tradiciones	Música, danza, festividades, gastronomía, oralidad, artesanía
Interpretación	5 conceptos + 6 FAQs	Qué es patrimonio, cómo conservarlo, preguntas frecuentes
Juegos	4 juegos	Quiz, memoria, ruleta, sopa de letras
📚 Fuentes de Información

    Oficina de Monumentos y Sitios Históricos de Baracoa

    Museo Municipal "Fuerte Matachín"

    Archivo Histórico Provincial de Guantánamo

    UNESCO (Convenciones sobre patrimonio)

    Bibliografía especializada (ver tesis)

👥 Autores
Nombre	Rol	Contribución
Arismaidis	Investigadora principal	Conceptualización, contenido patrimonial, validación
Lic. Amado	Tutor	Asesoría metodológica y técnica
📄 Licencia

Este proyecto es de uso educativo y cultural, sin fines comerciales.
🗺️ Próximas Mejoras

    Completar los 34 bienes patrimoniales (faltan 17)

    Agregar más imágenes a bienes y tradiciones

    Incorporar testimonios orales en audio/video

    Desarrollar versión para dispositivos móviles (APK)

    Implementar sistema de logros y progreso

Baracoa, Cuba - 2026

"Interpretar para Conservar: Proyecciones y Perspectivas del Patrimonio Cultural de la Ciudad de Baracoa"

¡"Memoria Viva" está completa! 🎉🏛️🇨🇺
text


---

## ✅ **Resumen final del proyecto**

| Componente | Estado |
|------------|--------|
| **README.md** | ✅ Actualizado |
| **Historia** | ✅ 42 hitos |
| **Patrimonio Tangible** | ✅ 17 bienes |
| **Patrimonio Intangible** | ✅ 17 tradiciones |
| **Interpretación** | ✅ 5 conceptos + 6 FAQs |
| **Juegos** | ✅ 4 juegos completos |
| **Estilos** | ✅ Consistentes |

---

**¿Qué hacemos ahora?** Podemos:

1. **Completar los 34 bienes patrimoniales** (faltan 17)
2. **Agregar más imágenes** a los datos existentes
3. **Crear documentación adicional** (guía de usuario, manual técnico)
4. **Preparar presentación** para la defensa de tesis
5. **Hacer pruebas de usabilidad** con usuarios reales