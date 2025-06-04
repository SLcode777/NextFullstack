import { prisma } from "@/lib/prisma";
import { format, isSameDay, startOfDay, subDays } from "date-fns";
import { ProjectWithDate } from "./types";

function getDaysLabels(numberOfDays: number): string[] {
  const days = [];
  const today = new Date();

  for (let i = numberOfDays - 1; i >= 0; i--) {
    const date = subDays(today, i);
    days.push(format(date, "dd MMM"));
  }

  return days;
}

function getProjectDataByDay(
  projects: { createdAt: Date }[],
  numberOfDays: number
): ProjectWithDate[] {
  const days = getDaysLabels(numberOfDays);
  const today = new Date();

  const dailyData = days.map((day, index) => {
    const date = subDays(today, numberOfDays - 1 - index);
    const startDay = startOfDay(date);

    const projectsInDay = projects.filter((project) =>
      isSameDay(project.createdAt, startDay)
    );

    return {
      day,
      count: projectsInDay.length,
    };
  });

  return dailyData;
}

function calculateTrendPercentage(data: ProjectWithDate[]): number {
  if (data.length < 2) return 0;

  // Compare last 5 days with previous 5 days
  const recentDays = data.slice(-5);
  const previousDays = data.slice(-10, -5);

  const recentSum = recentDays.reduce((sum, day) => sum + day.count, 0);
  const previousSum = previousDays.reduce((sum, day) => sum + day.count, 0);

  if (previousSum === 0) return recentSum > 0 ? 100 : 0;

  const percentage = ((recentSum - previousSum) / previousSum) * 100;
  return Math.round(percentage);
}

export async function getProjectData(userId: string, numberOfDays: number) {
  // ℹ️ Cette méthode peut prendre beaucoup de temps à charger.
  // 🦁 Créons un nouveau composant qui s'occupe d'afficher et de récupérer les données qu'on va pouvoir <Suspense />

  // Simulation d'une application de production qui a besoin de temps pour charger les données.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const allProjects = await prisma.project.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: subDays(new Date(), numberOfDays),
      },
    },
  });

  const projectData = getProjectDataByDay(allProjects, numberOfDays);
  const trendPercentage = calculateTrendPercentage(projectData);

  const today = new Date();
  const startDate = subDays(today, numberOfDays - 1);
  const dateRange = {
    start: startOfDay(startDate),
    end: today,
  };

  return {
    projectData,
    trendPercentage,
    dateRange,
  };
}
