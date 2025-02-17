import Fastify from 'fastify';

const fastify = Fastify({logger: true});

const API_URL = 'https://api.polarsteps.com';

fastify.get('/polarsteps/:username', async (req, reply) => {
  const username = req.params.username;
  const response = await fetch(`${API_URL}/users/byusername/${username}`);
  const data = await response.json();

  const trips = data.alltrips;
  if (!trips || trips.length === 0) {
    return reply.redirect(`https://www.polarsteps.com/${username}`);
  }

  const now = Math.floor(Date.now() / 1000);

  // Classer les voyages
  const currentTrip = trips.find(t => t.start_date <= now && t.end_date >= now);
  const futureTrips = trips.filter(t => t.start_date > now).sort((a, b) => a.start_date - b.start_date);
  const pastTrips = trips.filter(t => t.end_date < now).sort((a, b) => b.end_date - a.end_date);

  let selectedTrip = currentTrip || futureTrips[0] || pastTrips[0];

  if (selectedTrip) {
    const id = selectedTrip.id;
    const slug = selectedTrip.slug;
    console.log(`Redirection vers le voyage ${id}-${slug} de ${username}`);
    return reply.redirect(`https://www.polarsteps.com/${username}/${id}-${slug}`);
  }

  // Par défaut, redirige vers le profil
  reply.redirect(`https://www.polarsteps.com/${username}`);
});

fastify.get('/users/byusername/:username', async (req, reply) => {
  const username = req.params.username;
  const response = await fetch(`${API_URL}/users/byusername/${username}`);
  reply.header('Access-Control-Allow-Origin', '*');
  return reply.send(await response.json());
})

fastify.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Serveur en écoute sur ${address}`);
});
