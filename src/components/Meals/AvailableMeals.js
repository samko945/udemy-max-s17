import { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getMeals = async () => {
			const response = await fetch("https://udemy-max-s17-http-forms-default-rtdb.firebaseio.com/meals.json");

			if (!response.ok) {
				throw new Error("Oops.. we encountered a problem.");
			}

			const data = await response.json();
			const meals = [];
			for (const key in data) {
				meals.push({
					id: data[key],
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}
			setMeals(meals);
			setIsLoading(false);
		};
		try {
			getMeals();
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	}, []);

	if (isLoading || error) {
		return <section className={classes.MealsLoading}>{<p>{error}</p> || <p>Loading...</p>}</section>;
	}

	const mealsList = meals.map((meal) => (
		<MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
