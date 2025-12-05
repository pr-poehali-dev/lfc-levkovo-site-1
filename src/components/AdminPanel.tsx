import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  date: string;
  opponent: string;
  score: string;
  result: 'win' | 'draw' | 'loss';
  stadium: string;
  attendance: number;
  goalScorers: string[];
  opponentGoals: string[];
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  opponentStats: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
    yellowCards: number;
    redCards: number;
  };
}

interface LeagueTeam {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  highlight?: boolean;
}

interface AdminPanelProps {
  matches: Match[];
  leagueTable: LeagueTeam[];
  onUpdateMatches: (matches: Match[]) => void;
  onUpdateLeague: (league: LeagueTeam[]) => void;
}

export default function AdminPanel({ matches, leagueTable, onUpdateMatches, onUpdateLeague }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [editingTeam, setEditingTeam] = useState<LeagueTeam | null>(null);

  const handleMatchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const goalScorersStr = formData.get('goalScorers') as string;
    const opponentGoalsStr = formData.get('opponentGoals') as string;

    const newMatch: Match = {
      id: editingMatch?.id || Date.now(),
      date: formData.get('date') as string,
      opponent: formData.get('opponent') as string,
      score: formData.get('score') as string,
      result: formData.get('result') as 'win' | 'draw' | 'loss',
      stadium: formData.get('stadium') as string,
      attendance: Number(formData.get('attendance')),
      goalScorers: goalScorersStr ? goalScorersStr.split('\n').filter(g => g.trim()) : [],
      opponentGoals: opponentGoalsStr ? opponentGoalsStr.split('\n').filter(g => g.trim()) : [],
      possession: Number(formData.get('possession')),
      shots: Number(formData.get('shots')),
      shotsOnTarget: Number(formData.get('shotsOnTarget')),
      corners: Number(formData.get('corners')),
      fouls: Number(formData.get('fouls')),
      yellowCards: Number(formData.get('yellowCards')),
      redCards: Number(formData.get('redCards')),
      opponentStats: {
        possession: Number(formData.get('opponentPossession')),
        shots: Number(formData.get('opponentShots')),
        shotsOnTarget: Number(formData.get('opponentShotsOnTarget')),
        corners: Number(formData.get('opponentCorners')),
        fouls: Number(formData.get('opponentFouls')),
        yellowCards: Number(formData.get('opponentYellowCards')),
        redCards: Number(formData.get('opponentRedCards')),
      },
    };

    if (editingMatch) {
      onUpdateMatches(matches.map(m => m.id === editingMatch.id ? newMatch : m));
    } else {
      onUpdateMatches([...matches, newMatch]);
    }

    setEditingMatch(null);
  };

  const handleTeamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newTeam: LeagueTeam = {
      position: Number(formData.get('position')),
      team: formData.get('team') as string,
      played: Number(formData.get('played')),
      won: Number(formData.get('won')),
      drawn: Number(formData.get('drawn')),
      lost: Number(formData.get('lost')),
      points: Number(formData.get('points')),
      highlight: formData.get('highlight') === 'true',
    };

    if (editingTeam) {
      onUpdateLeague(leagueTable.map(t => t.position === editingTeam.position ? newTeam : t));
    } else {
      onUpdateLeague([...leagueTable, newTeam].sort((a, b) => a.position - b.position));
    }

    setEditingTeam(null);
  };

  const deleteMatch = (id: number) => {
    onUpdateMatches(matches.filter(m => m.id !== id));
  };

  const deleteTeam = (position: number) => {
    onUpdateLeague(leagueTable.filter(t => t.position !== position));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-primary text-secondary hover:bg-primary/90"
          size="icon"
        >
          <Icon name="Settings" size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Админ-панель</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matches">Матчи</TabsTrigger>
            <TabsTrigger value="league">Таблица лиги</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Управление матчами</h3>
              <Button onClick={() => setEditingMatch({} as Match)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить матч
              </Button>
            </div>

            {editingMatch && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>{editingMatch.id ? 'Редактировать матч' : 'Новый матч'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMatchSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Дата</Label>
                        <Input name="date" defaultValue={editingMatch.date} required />
                      </div>
                      <div>
                        <Label>Соперник</Label>
                        <Input name="opponent" defaultValue={editingMatch.opponent} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Счет</Label>
                        <Input name="score" defaultValue={editingMatch.score} placeholder="3:1" required />
                      </div>
                      <div>
                        <Label>Результат</Label>
                        <Select name="result" defaultValue={editingMatch.result}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="win">Победа</SelectItem>
                            <SelectItem value="draw">Ничья</SelectItem>
                            <SelectItem value="loss">Поражение</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Зрители</Label>
                        <Input name="attendance" type="number" defaultValue={editingMatch.attendance} required />
                      </div>
                    </div>

                    <div>
                      <Label>Стадион</Label>
                      <Input name="stadium" defaultValue={editingMatch.stadium} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Голы LFC LEVKOVO (каждый с новой строки)</Label>
                        <textarea
                          name="goalScorers"
                          className="w-full min-h-20 p-2 border rounded-md"
                          defaultValue={editingMatch.goalScorers?.join('\n')}
                        />
                      </div>
                      <div>
                        <Label>Голы соперника (каждый с новой строки)</Label>
                        <textarea
                          name="opponentGoals"
                          className="w-full min-h-20 p-2 border rounded-md"
                          defaultValue={editingMatch.opponentGoals?.join('\n')}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Статистика LFC LEVKOVO</h4>
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <Label>Владение %</Label>
                          <Input name="possession" type="number" defaultValue={editingMatch.possession} required />
                        </div>
                        <div>
                          <Label>Удары</Label>
                          <Input name="shots" type="number" defaultValue={editingMatch.shots} required />
                        </div>
                        <div>
                          <Label>В створ</Label>
                          <Input name="shotsOnTarget" type="number" defaultValue={editingMatch.shotsOnTarget} required />
                        </div>
                        <div>
                          <Label>Угловые</Label>
                          <Input name="corners" type="number" defaultValue={editingMatch.corners} required />
                        </div>
                        <div>
                          <Label>Фолы</Label>
                          <Input name="fouls" type="number" defaultValue={editingMatch.fouls} required />
                        </div>
                        <div>
                          <Label>Желтые</Label>
                          <Input name="yellowCards" type="number" defaultValue={editingMatch.yellowCards} required />
                        </div>
                        <div>
                          <Label>Красные</Label>
                          <Input name="redCards" type="number" defaultValue={editingMatch.redCards} required />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Статистика соперника</h4>
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <Label>Владение %</Label>
                          <Input name="opponentPossession" type="number" defaultValue={editingMatch.opponentStats?.possession} required />
                        </div>
                        <div>
                          <Label>Удары</Label>
                          <Input name="opponentShots" type="number" defaultValue={editingMatch.opponentStats?.shots} required />
                        </div>
                        <div>
                          <Label>В створ</Label>
                          <Input name="opponentShotsOnTarget" type="number" defaultValue={editingMatch.opponentStats?.shotsOnTarget} required />
                        </div>
                        <div>
                          <Label>Угловые</Label>
                          <Input name="opponentCorners" type="number" defaultValue={editingMatch.opponentStats?.corners} required />
                        </div>
                        <div>
                          <Label>Фолы</Label>
                          <Input name="opponentFouls" type="number" defaultValue={editingMatch.opponentStats?.fouls} required />
                        </div>
                        <div>
                          <Label>Желтые</Label>
                          <Input name="opponentYellowCards" type="number" defaultValue={editingMatch.opponentStats?.yellowCards} required />
                        </div>
                        <div>
                          <Label>Красные</Label>
                          <Input name="opponentRedCards" type="number" defaultValue={editingMatch.opponentStats?.redCards} required />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit">Сохранить</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingMatch(null)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {matches.map((match) => (
                <Card key={match.id} className="border-primary/20">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{match.date} • LFC LEVKOVO vs {match.opponent}</div>
                      <div className="text-2xl font-bold text-primary">{match.score}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingMatch(match)}>
                        <Icon name="Pencil" size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMatch(match.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="league" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Управление таблицей лиги</h3>
              <Button onClick={() => setEditingTeam({} as LeagueTeam)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить команду
              </Button>
            </div>

            {editingTeam && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>{editingTeam.position ? 'Редактировать команду' : 'Новая команда'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Позиция</Label>
                        <Input name="position" type="number" defaultValue={editingTeam.position} required />
                      </div>
                      <div>
                        <Label>Название команды</Label>
                        <Input name="team" defaultValue={editingTeam.team} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <Label>Игры</Label>
                        <Input name="played" type="number" defaultValue={editingTeam.played} required />
                      </div>
                      <div>
                        <Label>Победы</Label>
                        <Input name="won" type="number" defaultValue={editingTeam.won} required />
                      </div>
                      <div>
                        <Label>Ничьи</Label>
                        <Input name="drawn" type="number" defaultValue={editingTeam.drawn} required />
                      </div>
                      <div>
                        <Label>Поражения</Label>
                        <Input name="lost" type="number" defaultValue={editingTeam.lost} required />
                      </div>
                      <div>
                        <Label>Очки</Label>
                        <Input name="points" type="number" defaultValue={editingTeam.points} required />
                      </div>
                    </div>

                    <div>
                      <Label>Выделить (LFC LEVKOVO)</Label>
                      <Select name="highlight" defaultValue={editingTeam.highlight ? 'true' : 'false'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Да</SelectItem>
                          <SelectItem value="false">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">Сохранить</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingTeam(null)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {leagueTable.map((team) => (
                <Card key={team.position} className={`border-primary/20 ${team.highlight ? 'bg-primary/5' : ''}`}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">
                        {team.position}. {team.team}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        И:{team.played} В:{team.won} Н:{team.drawn} П:{team.lost} О:{team.points}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingTeam(team)}>
                        <Icon name="Pencil" size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteTeam(team.position)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
