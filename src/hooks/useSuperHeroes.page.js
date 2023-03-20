import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url:'/superheroes',method:'post',data:hero})
};
export const useSuperHeroesData = () => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError
    // select: (data) => {
    //   const superheroNames = data.data.map((hero) => hero.name);
    //   return superheroNames;
    // }
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess:(data)=>{
    //   // queryClient.invalidateQueries('super-heroes')
    //   queryClient.setQueryData('super-heroes',(oldQueryData)=>{
    //     return {
    //       ...oldQueryData,
    //       data:[...oldQueryData.data,data.data]
    //     }
    //   })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        };
      });
      return {
        previousHeroData
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    }
  });
};
