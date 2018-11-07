import React from 'react'
import ExerciseCard from './ExerciseCard'

function TrainingView() {
  return(
    <div>
      <ExerciseCard name="Fuerza Tren Superior" exercises={
            [
              {
                name: "Pullups",
                sets: 5,
                reps: 5
              }, {
                name: "Hangs en activo",
                sets: 5,
                reps: 5,
                segs: 10
              }, {
                name: "Dips",
                sets: 6,
                reps: 3
              }, {
                name: "Back lever",
                sets: 5,
                reps: 1,
                segs: 30
              }
            ]
          } />
          <ExerciseCard name="Fuerza Tren Inferior" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }
            ]
          } />
          <ExerciseCard name="Movilidad de Cadera" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 4",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 5",
                sets: 5,
                reps: 5
              }
            ]
          } />
          <ExerciseCard name="Protocolo Squat 3" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 4",
                sets: 5,
                reps: 5
              }
            ]
          } />
          <ExerciseCard name="Protocolo GH y ET" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 4",
                sets: 5,
                reps: 5
              }
            ]
          } />
          <ExerciseCard name="Carrera" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 4",
                sets: 5,
                reps: 5
              }
            ]
          } />
          <ExerciseCard name="Prehabilitación HS" exercises={
            [
              {
                name: "Ejercicio 1",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 2",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 3",
                sets: 5,
                reps: 5
              }, {
                name: "Ejercicio 4",
                sets: 5,
                reps: 5
              }
            ]
          } />
    </div>
  )
}

export default TrainingView