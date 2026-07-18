# Especificaciones de Imágenes - mochis-play

## Estructura de Carpetas

```
public/images/
├── products/
│   ├── mochis/
│   │   ├── mimi.webp
│   │   ├── duoduo.webp
│   │   ├── paopao.webp
│   │   ├── yuyu.webp
│   │   └── nana.webp
│   ├── gatos/
│   │   ├── gato-negro.webp
│   │   ├── gato-blanco.webp
│   │   └── gato-gris.webp
│   └── ponejos/
│       ├── ponejo-rojo.webp
│       ├── ponejo-verde.webp
│       ├── ponejo-azul.webp
│       └── ponejo-amarillo.webp
├── categories/
│   ├── mochis-collection.webp
│   └── ponejos-collection.webp
├── hero/
│   └── (imágenes de portada para home)
└── thumbs/
    └── (thumbnails para listas)
```

## Tamaños Óptimos

### Productos

| Uso | Tamaño | Formato | Notas |
|-----|--------|---------|-------|
| Card producto | 400x400px | WebP | Cuadrado, fondo transparente o color sólido |
| Galería detalle | 800x800px | WebP | Alta calidad para zoom |
| Thumbnail lista | 150x150px | WebP | Pequeño para grids compactos |

### Home / Hero

| Uso | Tamaño | Formato | Notas |
|-----|--------|---------|-------|
| Hero principal | 1920x1080px | WebP | Horizontal, alta calidad |
| Banner secundario | 1200x600px | WebP | Para secciones intermedias |
| Card destacada | 600x400px | WebP | Para features |

### General

| Uso | Tamaño | Formato | Notas |
|-----|--------|---------|-------|
| Logo | 200x200px | SVG/WebP | Vectorial preferido |
| Iconos | 64x64px | SVG | Iconos de features |
| Blog post | 1200x630px | WebP | Para compartir en redes (OG image) |

## Convenciones de Nombre

- **Mochis**: `{nombre}.webp` (ej: `mimi.webp`)
- **Gatos**: `gato-{color}.webp` (ej: `gato-negro.webp`)
- **Ponejos**: `ponejo-{color}.webp` (ej: `ponejo-rojo.webp`)
- **Category preview collections**: `{categoria}-collection.webp` (ej: `mochis-collection.webp`)

## Recomendaciones

1. **Formato**: Usar WebP para mejor compresión (70-80% más pequeño que PNG/JPG)
2. **Fondo**: Transparente o color sólido que combine con la paleta del sitio
3. **Calidad**: 80-85% para balance calidad/tamaño
4. **Consistencia**: Todos los productos de una categoría deben tener el mismo estilo de foto
5. **Iluminación**: Luz suave y uniforme, sin sombras duras
6. **Composición**: Producto centrado, ocupando 70-80% del frame

## Herramientas Recomendadas

- **Conversión a WebP**: [squoosh.app](https://squoosh.app) o `cwebp` CLI
- **Edición**: Figma, Photoshop, o GIMP
- **Optimización**: TinyPNG, ImageOptim

## Ejemplo de Conversión CLI

```bash
# Instalar libwebp (Linux)
sudo apt install webp

# Convertir PNG a WebP
cwebp -q 85 imagen.png -o imagen.webp

# Convertir toda una carpeta
for f in *.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done
```
