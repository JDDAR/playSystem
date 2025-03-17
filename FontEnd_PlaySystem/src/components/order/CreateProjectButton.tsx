import React from "react";

interface CreateProjectButtonProps {
	submitting: boolean;
	selectedDependencies: string[];
	handleCreateProject: () => void;
}

const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({
	submitting,
	selectedDependencies,
	handleCreateProject,
}) => {
	return (
		<button
			onClick={handleCreateProject}
			className="createProjectBtn"
			disabled={submitting || selectedDependencies.length === 0}
		>
			{submitting ? "Creando..." : "Crear Proyecto"}
		</button>
	);
};

export default CreateProjectButton;