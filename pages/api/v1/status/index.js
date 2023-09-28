function status(request, response) {
  response.status(200).json({ dados: "alunos do curso.dev são feras" });
}

export default status;
