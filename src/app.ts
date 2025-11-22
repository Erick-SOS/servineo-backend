import express from 'express';
import cors from 'cors';
import HealthRoutes from './api/routes/health.routes';
import jobOfertRoutes from './api/routes/jobOfert.routes';
import newoffersRoutes from './api/routes/newOffers.routes';
import fixerRoutes from './api/routes/fixer.routes';
import activityRoutes from './api/routes/activities.routes';
import jobsRoutes from './api/routes/jobs.routes';
import searchRoutes from './api/routes/search.routes';
import experienceRoutes from './api/routes/experience.routes';
import userProfileRoutes from './routes/userProfile.routes';

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8082',
  'http://localhost:8000',
  'http://localhost:8081',
  process.env.FRONTEND_URL,
];

// Configuración CORS mejorada
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Postman, Thunder Client, apps móviles)
      if (!origin) return callback(null, true);
      
      // Verifica si el origin está en la lista permitida
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

// Middleware para logs (útil para debugging)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} from ${req.headers.origin || 'no-origin'}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', HealthRoutes);
app.use('/api/devmaster', jobOfertRoutes);
app.use('/api/newOffers', newoffersRoutes);
app.use('/api/fixers', fixerRoutes);
app.use('/api/user-profiles', userProfileRoutes);
app.use('/api', activityRoutes);
app.use('/api', jobsRoutes);
app.use('/api', searchRoutes);
app.use('/api', experienceRoutes);

app.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default app;