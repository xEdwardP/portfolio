import type { Locale } from '@/i18n/config';

// Keys match the project folder and exact filename; keep both languages together.
export const projectScreenshots: Record<
  string,
  Record<string, Record<Locale, string>>
> = {
  'bitacora-911': {
    '01.png': {
      es: 'Inicio de sesión con usuario y contraseña.',
      en: 'Sign-in screen with username and password.',
    },
    '02.png': {
      es: 'Panel administrativo con indicadores, auditoría reciente y estado del sistema en tema oscuro.',
      en: 'Dark admin dashboard with indicators, recent audit activity and system status.',
    },
    '03.png': {
      es: 'Registro e historial de recesos con filtros por usuario y fecha.',
      en: 'Break registration and history with user and date filters.',
    },
    '04.png': {
      es: 'Listado de usuarios con roles, grupos, estado y último acceso.',
      en: 'User directory showing roles, groups, status and last sign-in.',
    },
    '05.png': {
      es: 'Tabla de revisión con filtros y resultados de registros operativos.',
      en: 'Review table with filters and operational record results.',
    },
    '06.png': {
      es: 'Panel administrativo con indicadores y estado del sistema en tema claro.',
      en: 'Light admin dashboard with indicators and system status.',
    },
    '07.png': {
      es: 'Panel administrativo con indicadores y actividad reciente en tema azul.',
      en: 'Blue admin dashboard with indicators and recent activity.',
    },
  },
  bluerose: {
    '01.png': {
      es: 'Página principal de la tienda con productos destacados y buscador.',
      en: 'Store homepage with featured products and search.',
    },
    '02.png': {
      es: 'Catálogo de productos con categorías y precios.',
      en: 'Product catalog with categories and prices.',
    },
    '03.png': {
      es: 'Carrito vacío con resumen del pedido y opción de pago.',
      en: 'Empty cart with order summary and checkout option.',
    },
    '04.png': {
      es: 'Área de cuenta con lista de deseos y configuración.',
      en: 'Account area with wishlist and settings.',
    },
  },
  'catracho-go': {
    '01.png': {
      es: 'Página principal con opciones para pasajeros y conductores en tema claro.',
      en: 'Light homepage with passenger and driver options.',
    },
    '02.png': {
      es: 'Página principal con opciones para pasajeros y conductores en tema oscuro.',
      en: 'Dark homepage with passenger and driver options.',
    },
    '03.png': {
      es: 'Inicio de sesión por correo o cuenta de Google.',
      en: 'Sign-in screen with email and Google account options.',
    },
    '04.png': {
      es: 'Panel del pasajero con mapa, búsqueda de destino y direcciones favoritas.',
      en: 'Passenger dashboard with map, destination search and favorite addresses.',
    },
    '05.png': {
      es: 'Panel del conductor con mapa, disponibilidad y resumen de viajes.',
      en: 'Driver dashboard with map, availability and trip summary.',
    },
    '06.png': {
      es: 'Panel administrativo con estadísticas y gráficas de viajes.',
      en: 'Admin dashboard with trip statistics and charts.',
    },
  },
  fantasy: {
    '01.jpg': {
      es: 'Página de un grupo de predicciones de fútbol con acceso a pronósticos y posiciones.',
      en: 'Football prediction group page with predictions and standings links.',
    },
  },
  firewalk: {
    '01.png': {
      es: 'Menú principal con resumen de sucursales, categorías, proveedores y productos.',
      en: 'Main dashboard summarizing branches, categories, suppliers and products.',
    },
    '02.png': {
      es: 'Pantalla de inicio de sesión del sistema de inventario.',
      en: 'Inventory system sign-in screen.',
    },
    '03.png': {
      es: 'Listado de productos con existencias, presentación y acciones de gestión.',
      en: 'Product list with stock, packaging and management actions.',
    },
    '04.png': {
      es: 'Consulta de lotes con filtros por fechas y estado.',
      en: 'Batch lookup with date and status filters.',
    },
    '05.png': {
      es: 'Inventario por sucursal con acceso a las existencias de cada ubicación.',
      en: 'Branch inventory with access to stock at each location.',
    },
  },
  macaw: {
    '01.png': {
      es: 'Página principal con presentación de las tutorías y acceso a la búsqueda de tutores.',
      en: 'Homepage introducing peer tutoring and tutor search.',
    },
    '02.png': {
      es: 'Panel del Director con indicadores de campus, tutores y actividad académica.',
      en: 'Director dashboard with campus, tutor and academic activity indicators.',
    },
    '03.png': {
      es: 'Panel de coordinación del campus con estudiantes, tutores y subsidios.',
      en: 'Campus coordinator dashboard with students, tutors and subsidies.',
    },
    '04.png': {
      es: 'Panel del tutor con saldo, solicitudes pendientes y próximas sesiones.',
      en: 'Tutor dashboard with balance, pending requests and upcoming sessions.',
    },
    '05.png': {
      es: 'Búsqueda de tutores con filtros y tarjetas de perfiles disponibles.',
      en: 'Tutor search with filters and available profile cards.',
    },
    '06.png': {
      es: 'Monedero del estudiante con saldo e historial de transacciones.',
      en: 'Student wallet with balance and transaction history.',
    },
  },
  moneymind: {
    '01.png': {
      es: 'Resumen financiero con ingresos, gastos, balance y gráficas en tema oscuro.',
      en: 'Dark financial dashboard with income, expenses, balance and charts.',
    },
    '02.png': {
      es: 'Resumen financiero con ingresos, gastos, balance y gráficas en tema claro.',
      en: 'Light financial dashboard with income, expenses, balance and charts.',
    },
    '03.png': {
      es: 'Listado de presupuestos con importe asignado, gasto y porcentaje consumido.',
      en: 'Budget list showing allocated amounts, spending and usage percentages.',
    },
    '04.png': {
      es: 'Categorías de ingresos y gastos con opciones de edición.',
      en: 'Income and expense categories with editing options.',
    },
    '05.png': {
      es: 'Historial de movimientos con categoría, importe, descripción y fecha.',
      en: 'Transaction history with category, amount, description and date.',
    },
    '06.png': {
      es: 'Formulario para registrar un movimiento financiero.',
      en: 'Form for recording a financial transaction.',
    },
  },
  orders: {
    '01.jpg': {
      es: 'Catálogo de alimentos con buscador, paginación y botones para añadir al carrito.',
      en: 'Food catalog with search, pagination and add-to-cart buttons.',
    },
  },
  poshn: {
    '01.png': {
      es: 'Catálogo de categorías con margen y acciones de edición en tema oscuro.',
      en: 'Dark category catalog with margins and editing actions.',
    },
    '02.png': {
      es: 'Catálogo de categorías con margen y acciones de edición en tema claro.',
      en: 'Light category catalog with margins and editing actions.',
    },
  },
  skully: {
    '01.png': {
      es: 'Panel de activos de TI con indicadores de inventario, asignaciones y licencias.',
      en: 'IT asset dashboard with inventory, assignment and license indicators.',
    },
    '02.png': {
      es: 'Inventario de activos con filtros, historial y opciones de impresión.',
      en: 'Asset inventory with filters, history and printing options.',
    },
    '03.png': {
      es: 'Configuración de los datos y el logotipo de la empresa.',
      en: 'Company details and logo settings.',
    },
  },
  spendwise: {
    '01.jpg': {
      es: 'Tres pantallas móviles: bienvenida, balance con movimientos y captura de recibos.',
      en: 'Three mobile screens: welcome, balance with transactions and receipt capture.',
    },
  },
  twinbay: {
    '01.jpg': {
      es: 'Panel de parqueo con resumen de espacios, vehículos, tickets y calendario.',
      en: 'Parking dashboard with spaces, vehicles, tickets and calendar summary.',
    },
  },
  ventashn: {
    '01.jpg': {
      es: 'Panel de ventas con ingresos, costos, ganancias y ventas recientes.',
      en: 'Sales dashboard with revenue, costs, profit and recent sales.',
    },
    '01.png': {
      es: 'Panel de ventas con indicadores comerciales y últimas transacciones.',
      en: 'Sales dashboard with business indicators and latest transactions.',
    },
    '02.png': {
      es: 'Pantalla de venta con productos y detalle del carrito.',
      en: 'Sales screen with products and cart details.',
    },
    '03.png': {
      es: 'Reporte de ventas con filtros y tabla de resultados exportables.',
      en: 'Sales report with filters and exportable results table.',
    },
    '04.png': {
      es: 'Gestión de productos con categorías, existencias, precios y acciones.',
      en: 'Product management with categories, stock, prices and actions.',
    },
    '05.png': {
      es: 'Administración de usuarios con roles, estado y opciones de edición.',
      en: 'User administration with roles, status and editing options.',
    },
  },
};
