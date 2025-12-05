import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const matches = [
    {
      id: 1,
      date: '15 ноября 2024',
      opponent: 'ФК СПАРТАК',
      score: '3:1',
      result: 'win',
      stadium: 'Стадион Левково',
      attendance: 5420,
      goalScorers: ['Кузнецов С. (12, 45+2)', 'Смирнов А. (67)'],
      opponentGoals: ['Иванов П. (78)'],
      possession: 58,
      shots: 16,
      shotsOnTarget: 8,
      corners: 7,
      fouls: 11,
      yellowCards: 2,
      redCards: 0,
      opponentStats: { possession: 42, shots: 9, shotsOnTarget: 4, corners: 3, fouls: 14, yellowCards: 3, redCards: 0 },
    },
    {
      id: 2,
      date: '8 ноября 2024',
      opponent: 'ЗЕНИТ СПБ',
      score: '1:1',
      result: 'draw',
      stadium: 'Стадион Зенит',
      attendance: 12500,
      goalScorers: ['Сидоров М. (34)'],
      opponentGoals: ['Петров Д. (56)'],
      possession: 48,
      shots: 11,
      shotsOnTarget: 5,
      corners: 5,
      fouls: 13,
      yellowCards: 3,
      redCards: 0,
      opponentStats: { possession: 52, shots: 13, shotsOnTarget: 6, corners: 6, fouls: 10, yellowCards: 2, redCards: 0 },
    },
    {
      id: 3,
      date: '1 ноября 2024',
      opponent: 'FC ДИНАМО',
      score: '0:2',
      result: 'loss',
      stadium: 'Стадион Динамо',
      attendance: 8900,
      goalScorers: [],
      opponentGoals: ['Козлов А. (23)', 'Морозов В. (82)'],
      possession: 44,
      shots: 8,
      shotsOnTarget: 3,
      corners: 4,
      fouls: 15,
      yellowCards: 4,
      redCards: 0,
      opponentStats: { possession: 56, shots: 15, shotsOnTarget: 9, corners: 8, fouls: 9, yellowCards: 1, redCards: 0 },
    },
  ];

  const leagueTable = [
    { position: 1, team: 'FC ДИНАМО', played: 12, won: 10, drawn: 1, lost: 1, points: 31 },
    { position: 2, team: 'LFC LEVKOVO', played: 12, won: 8, drawn: 3, lost: 1, points: 27, highlight: true },
    { position: 3, team: 'ФК СПАРТАК', played: 12, won: 8, drawn: 2, lost: 2, points: 26 },
    { position: 4, team: 'ЗЕНИТ СПБ', played: 12, won: 7, drawn: 3, lost: 2, points: 24 },
    { position: 5, team: 'ЛОКОМОТИВ', played: 12, won: 6, drawn: 4, lost: 2, points: 22 },
  ];

  const players = [
    { number: 1, name: 'Иванов Алексей', position: 'Вратарь', photo: '🧤' },
    { number: 5, name: 'Петров Дмитрий', position: 'Защитник', photo: '🛡️' },
    { number: 10, name: 'Сидоров Михаил', position: 'Полузащитник', photo: '⚡' },
    { number: 9, name: 'Кузнецов Сергей', position: 'Нападающий', photo: '⚽' },
    { number: 7, name: 'Смирнов Антон', position: 'Нападающий', photo: '🎯' },
    { number: 3, name: 'Волков Игорь', position: 'Защитник', photo: '🛡️' },
  ];

  const news = [
    {
      title: 'Победа в дерби! 3:1 против ФК Спартак',
      date: '15 ноября 2024',
      description: 'Уверенная победа команды в принципиальном матче местного значения.',
    },
    {
      title: 'Новый игрок в составе',
      date: '10 ноября 2024',
      description: 'LFC LEVKOVO усиливается перспективным полузащитником из молодежной сборной.',
    },
    {
      title: 'Интервью с капитаном команды',
      date: '5 ноября 2024',
      description: 'Капитан делится планами на оставшуюся часть сезона и секретами успеха.',
    },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src="https://cdn.poehali.dev/files/27b3be7f-f8bc-41cf-b619-98f579b8d04c.jpeg" alt="LFC LEVKOVO" className="h-12 w-12" />
              <span className="text-xl font-bold text-primary">LFC LEVKOVO</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'about', label: 'О команде', icon: 'Users' },
                { id: 'squad', label: 'Состав', icon: 'UserCircle' },
                { id: 'results', label: 'Результаты', icon: 'Trophy' },
                { id: 'news', label: 'Новости', icon: 'Newspaper' },
                { id: 'gallery', label: 'Галерея', icon: 'Image' },
                { id: 'contacts', label: 'Контакты', icon: 'Mail' },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => scrollToSection(item.id)}
                  className="text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Icon name={item.icon as any} size={16} className="mr-1" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-black z-0" />
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/afdd1618-accb-44ed-b7ca-82b0ce6fa74e.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 z-10 text-center">
          <Badge className="mb-4 bg-primary text-white text-lg px-6 py-2 animate-fade-in">
            Сезон 2024/2025
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            LFC LEVKOVO
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Энергия. Командный дух. Победы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="text-lg px-8 hover-scale bg-primary text-secondary hover:bg-primary/90" onClick={() => scrollToSection('results')}>
              <Icon name="Trophy" size={20} className="mr-2" />
              Таблица лиги
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary hover-scale" onClick={() => scrollToSection('squad')}>
              <Icon name="Users" size={20} className="mr-2" />
              Наш состав
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-secondary">О команде</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                LFC LEVKOVO — это футбольный клуб с богатой историей и непоколебимым командным духом. Основанная в 2010 году, команда быстро завоевала сердца болельщиков своей энергичной игрой и преданностью спорту.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Наша философия основана на трех принципах: профессионализм, командная работа и стремление к победе. Мы воспитываем не только футболистов, но и характеры.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <Card className="text-center hover-scale border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">14</div>
                    <div className="text-sm text-muted-foreground">Лет истории</div>
                  </CardContent>
                </Card>
                <Card className="text-center hover-scale border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">27</div>
                    <div className="text-sm text-muted-foreground">Трофеев</div>
                  </CardContent>
                </Card>
                <Card className="text-center hover-scale border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">2</div>
                    <div className="text-sm text-muted-foreground">Место в лиге</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800"
                alt="Команда"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="squad" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-secondary">Состав команды</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <Card key={player.number} className="hover-scale border-primary/20 overflow-hidden">
                <CardHeader className="bg-secondary">
                  <div className="flex items-center justify-between">
                    <div className="text-6xl">{player.photo}</div>
                    <div className="text-5xl font-bold text-primary">{player.number}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-xl mb-2">{player.name}</CardTitle>
                  <Badge variant="secondary">{player.position}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 text-secondary">Результаты матчей</h2>
          <p className="text-center text-muted-foreground mb-12">Сезон 2024/2025 • Последние матчи</p>

          {selectedMatch !== null ? (
            <div className="max-w-6xl mx-auto">
              <Button
                variant="outline"
                onClick={() => setSelectedMatch(null)}
                className="mb-6"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад к матчам
              </Button>
              {(() => {
                const match = matches.find(m => m.id === selectedMatch);
                if (!match) return null;
                return (
                  <div className="space-y-6">
                    <Card className="border-primary/20">
                      <CardHeader className="bg-secondary text-primary">
                        <div className="text-center">
                          <div className="text-sm mb-2">{match.date}</div>
                          <div className="text-4xl font-bold mb-2">
                            <span>LFC LEVKOVO</span>
                            <span className="mx-4 text-5xl">{match.score}</span>
                            <span>{match.opponent}</span>
                          </div>
                          <div className="text-sm mt-2">
                            <Icon name="MapPin" size={16} className="inline mr-1" />
                            {match.stadium} • Зрители: {match.attendance.toLocaleString()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-secondary">Голы LFC LEVKOVO</h3>
                            {match.goalScorers.length > 0 ? (
                              <ul className="space-y-2">
                                {match.goalScorers.map((scorer, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <Icon name="Target" size={16} className="text-primary" />
                                    <span>{scorer}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground">Нет забитых голов</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-secondary">Голы соперника</h3>
                            {match.opponentGoals.length > 0 ? (
                              <ul className="space-y-2">
                                {match.opponentGoals.map((scorer, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <Icon name="Target" size={16} className="text-red-600" />
                                    <span>{scorer}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground">Нет пропущенных голов</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle>Статистика матча</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold">Владение мячом</span>
                            <span className="text-muted-foreground">{match.possession}% - {match.opponentStats.possession}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                            <div className="bg-primary" style={{ width: `${match.possession}%` }} />
                            <div className="bg-red-500" style={{ width: `${match.opponentStats.possession}%` }} />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">{match.shots}</div>
                            <div className="text-sm text-muted-foreground">Удары</div>
                            <div className="text-2xl font-bold text-red-600 mt-2">{match.opponentStats.shots}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">{match.shotsOnTarget}</div>
                            <div className="text-sm text-muted-foreground">Удары в створ</div>
                            <div className="text-2xl font-bold text-red-600 mt-2">{match.opponentStats.shotsOnTarget}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">{match.corners}</div>
                            <div className="text-sm text-muted-foreground">Угловые</div>
                            <div className="text-2xl font-bold text-red-600 mt-2">{match.opponentStats.corners}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
                          <div>
                            <div className="text-2xl font-bold text-primary">{match.fouls}</div>
                            <div className="text-sm text-muted-foreground">Фолы</div>
                            <div className="text-2xl font-bold text-red-600 mt-2">{match.opponentStats.fouls}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-500">{match.yellowCards}</div>
                            <div className="text-sm text-muted-foreground">Желтые карточки</div>
                            <div className="text-2xl font-bold text-yellow-500 mt-2">{match.opponentStats.yellowCards}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600">{match.redCards}</div>
                            <div className="text-sm text-muted-foreground">Красные карточки</div>
                            <div className="text-2xl font-bold text-red-600 mt-2">{match.opponentStats.redCards}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {matches.map((match) => (
                  <Card
                    key={match.id}
                    className={`hover-scale border-primary/20 cursor-pointer ${
                      match.result === 'win' ? 'border-l-4 border-l-green-500' :
                      match.result === 'draw' ? 'border-l-4 border-l-yellow-500' :
                      'border-l-4 border-l-red-500'
                    }`}
                    onClick={() => setSelectedMatch(match.id)}
                  >
                    <CardHeader>
                      <div className="text-sm text-muted-foreground mb-2">{match.date}</div>
                      <CardTitle className="text-lg">LFC LEVKOVO vs {match.opponent}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-primary">{match.score}</div>
                        <Badge
                          className="mt-2"
                          variant={match.result === 'win' ? 'default' : 'secondary'}
                        >
                          {match.result === 'win' ? 'Победа' : match.result === 'draw' ? 'Ничья' : 'Поражение'}
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        Подробнее <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-6 text-secondary">Таблица лиги</h3>
                <Card className="border-primary/20">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-secondary text-primary">
                          <tr>
                            <th className="text-left p-4 font-semibold">Позиция</th>
                            <th className="text-left p-4 font-semibold">Команда</th>
                            <th className="text-center p-4 font-semibold">Игры</th>
                            <th className="text-center p-4 font-semibold">Победы</th>
                            <th className="text-center p-4 font-semibold">Ничьи</th>
                            <th className="text-center p-4 font-semibold">Поражения</th>
                            <th className="text-center p-4 font-semibold">Очки</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leagueTable.map((team) => (
                            <tr
                              key={team.position}
                              className={`border-b transition-colors ${
                                team.highlight
                                  ? 'bg-primary/10 font-semibold'
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <td className="p-4">
                                <div className="flex items-center">
                                  {team.position === 1 && <Icon name="Crown" size={20} className="text-primary mr-2" />}
                                  {team.position}
                                </div>
                              </td>
                              <td className="p-4">
                                {team.highlight && <img src="https://cdn.poehali.dev/files/27b3be7f-f8bc-41cf-b619-98f579b8d04c.jpeg" alt="" className="w-5 h-5 inline mr-2" />}
                                {team.team}
                              </td>
                              <td className="text-center p-4">{team.played}</td>
                              <td className="text-center p-4 text-green-600">{team.won}</td>
                              <td className="text-center p-4 text-muted-foreground">{team.drawn}</td>
                              <td className="text-center p-4 text-red-600">{team.lost}</td>
                              <td className="text-center p-4 font-bold text-primary">{team.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </section>

      <section id="news" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-secondary">Новости</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <Card key={index} className="hover-scale border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="Calendar" size={16} />
                    {item.date}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  <Button variant="link" className="px-0 mt-4 text-primary">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-secondary">Галерея</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden hover-scale">
                <img
                  src={image}
                  alt={`Галерея ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-secondary text-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-primary">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Адрес</div>
                      <div className="text-primary/80">г. Левково, ул. Спортивная, 15</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Телефон</div>
                      <div className="text-primary/80">+7 (495) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-primary/80">info@lfclevkovo.ru</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Следите за нами</h3>
                <div className="flex gap-4">
                  <Button size="lg" variant="outline" className="hover-scale bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary">
                    <Icon name="Facebook" size={24} />
                  </Button>
                  <Button size="lg" variant="outline" className="hover-scale bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary">
                    <Icon name="Instagram" size={24} />
                  </Button>
                  <Button size="lg" variant="outline" className="hover-scale bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary">
                    <Icon name="Twitter" size={24} />
                  </Button>
                  <Button size="lg" variant="outline" className="hover-scale bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary">
                    <Icon name="Youtube" size={24} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-primary py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary/60">© 2024 LFC LEVKOVO. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}