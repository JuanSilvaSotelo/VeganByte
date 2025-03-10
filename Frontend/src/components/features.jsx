import React from 'react';

function Features() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Características</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Ejemplo de una característica */}
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Característica 1</h3>
                        <p>Descripción breve de la característica.</p>
                    </div>
                    {/* Repite para las demás características */}
                </div>
            </div>
        </section>
    );
}

export default Features;