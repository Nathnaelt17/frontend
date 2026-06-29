// DEAD CODE: This page is not routed and contains legacy mock audit content.
import { useMemo, useState } from "react";

import AuditFilters from "../../features/Audit/components/AuditFilters";
import { AuditLogEntryCard } from "../../features/Audit/components/AuditLogCard";
// Removed mock data import

const filteredLogs = []; // Placeholder for future API integration

export default function AuditLogsPage() {
  const [selectedRole, setSelectedRole] =
    useState("ALL");

  const filteredLogs = useMemo(() => {
    if (selectedRole === "ALL") {
      return mockAuditLogs;
    }

    return mockAuditLogs.filter(
      (log) => log.role === selectedRole
    );
  }, [selectedRole]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Audit Logs
        </h1>

        <p className="text-gray-500 mt-2">
          All audit logs are immutable and
          cannot be modified.
        </p>
      </div>

      <AuditFilters
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <AuditLogEntryCard
            key={log.id}
            entry={log}
          />
        ))}
      </div>
    </div>
  );
}
