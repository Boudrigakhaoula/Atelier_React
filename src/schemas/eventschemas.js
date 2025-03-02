import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
  price: z.number().min(1, { message: "Le prix doit être supérieur ou égal à 1." }).max(1000, { message: "Le prix doit être inférieur ou égal à 1000." }),
  nbTickets: z.number().min(1, { message: "Le nombre de tickets doit être supérieur ou égal à 1." }).max(100, { message: "Le nombre de tickets doit être inférieur ou égal à 100." }),
  nbParticipants: z.number().min(0, { message: "Le nombre de participants ne peut pas être négatif." }).max(100, { message: "Le nombre de participants doit être inférieur ou égal à 100." }),
  img: z.string().url({ message: "L'URL de l'image doit être valide. obligatoire forme https://example.com/exemple_image.jpg" }).optional(),
});